import {
  Box,
  Button,
  Flex,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Image,
  ModalFooter,
  ModalCloseButton,
  Input,
  Select,
} from "@chakra-ui/react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  ButtonGroup,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import {
  useDeleteImpactMutation,
  useInsertImpactMutation,
  useUpdateImpactMutation,
} from "generated-graphql";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import Loader from "components/Loader";
import { useForm } from "react-hook-form";
import { Field } from "./Pages/AddEditOrg.form";
import SDG from "../lib/SDGs";

type ImpactModelType = {
  isOpen: boolean;
  onClose: () => void;
  impact?: any;
  org: any;
  refetchList?: () => void;
};

const ImpactModal = ({
  isOpen,
  onClose,
  impact,
  org,
  refetchList,
}: ImpactModelType) => {
  const isEditMode = !!impact?.id;
  const valueRegex = /(\D*?)([\d|,|.|e|E|\+]+)(\D*)/g;
  const FIELDS: Field[] = [
    {
      id: "indicator",
      label: "What do you measure?",
      element: Input,
      validation: {},
    },
    {
      id: "value",
      label: "Total",
      element: Input,
      validation: {
        pattern: valueRegex,
      },
    },
    {
      id: "context",
      label: "Context",
      element: Textarea,
      validation: {},
    },
  ].filter(Boolean);
  console.log({ impact });
  const impactValue =
    (impact?.prefix || "") + (impact?.value || "") + (impact?.suffix || "");
  const defaultImpact = {
    ...impact,
    value: impactValue,
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    defaultValues: defaultImpact,
  });
  useEffect(() => reset(defaultImpact), [impact]);
  const values = watch();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [session] = useSession();

  const [
    insertImpact,
    { loading: insertImpactFetching, error: insertImpactError },
  ] = useInsertImpactMutation();

  // console.log({ insertImpact, insertImpactFetching, insertImpactError });
  const [
    updateImpact,
    { loading: updateImpactFetching, error: updateImpactError },
  ] = useUpdateImpactMutation();
  if (updateImpactError) console.error(updateImpactError);
  const [
    deleteImpact,
    { loading: deleteImpactFetching, error: deleteImpactError },
  ] = useDeleteImpactMutation({ variables: { id: impact?.id } });

  if (!session) return <AccessDeniedIndicator message="Please sign in" />;

  const closeForm = async () => {
    await refetchList?.();
    // reset({ indicator: "", value: "", sdg: "" });
    onClose();
  };

  const handleDelete = async () => {
    await deleteImpact();
    await closeForm();
  };

  const onSubmit = async (values, e) => {
    try {
      // console.log({ isEditMode });
      if (isEditMode) {
        const updateVariables = { id: impact.id, ...values, org: org?.id };
        const [str, prefix, number, suffix] = valueRegex.exec(
          updateVariables.value
        );
        updateVariables.value = +number;
        updateVariables.prefix = prefix;
        updateVariables.suffix = suffix;
        await updateImpact({ variables: updateVariables });
      } else {
        const insertVariables = { ...values, org: org?.id };
        const [str, prefix, number, suffix] = valueRegex.exec(
          insertVariables.value
        );
        insertVariables.value = +number;
        insertVariables.prefix = prefix;
        insertVariables.suffix = suffix;
        insertVariables.priority = org.impacts?.length || 1;
        await insertImpact({ variables: insertVariables });
      }
      await closeForm();
    } catch (err) {
      console.error(err);
    }
  };

  const errorNode = () => {
    if (!insertImpactError) return false;
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{insertImpactError}</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  // if (isFetching || isSubmitted) return <Loader message={isSubmitted} />;

  return (
    <Modal isOpen={isOpen} onClose={closeForm}>
      <ModalOverlay />
      <ModalContent px={8}>
        <ModalCloseButton />
        <Stack spacing={4}>
          {errorNode()}
          <Stack spacing={4} my={12}>
            {FIELDS?.map((field) => {
              return (
                <FormControl key={field.id} isInvalid={errors[field.id]}>
                  <FormLabel
                    style={{ fontSize: 22 }}
                    htmlFor={errors[field.id]}
                  >
                    {field.label}
                  </FormLabel>

                  <field.element
                    autoComplate="off"
                    id={field.id}
                    placeholder={field.placeholder}
                    {...register(field.id, field.validation)}
                  />
                  <FormErrorMessage>
                    {errors[field.id] && errors[field.id].message}
                  </FormErrorMessage>
                </FormControl>
              );
            })}
            {/* {!isEditMode && ( */}
            <FormControl isInvalid={errors["sdg"]}>
              <FormLabel style={{ fontSize: 22 }} htmlFor={errors["sdg"]}>
                Global Goal
              </FormLabel>

              <Select {...register("sdg", {})}>
                <option value="">Select a goal</option>
                {SDG.map((sdg) => {
                  return (
                    <option key={sdg.id} value={sdg.id}>
                      {sdg.goal}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {errors.sdg && errors.sdg.message}
              </FormErrorMessage>
            </FormControl>
            {/* )} */}

            <ModalFooter p={0}>
              <FormControl>
                <Flex mt={12} justifyContent={"space-between"}>
                  {isEditMode ? (
                    <Button
                      marginRight={"auto"}
                      colorScheme="red"
                      leftIcon={<DeleteIcon />}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Box></Box>
                  )}
                  <ButtonGroup>
                    {/* <Button onClick={() => closeForm()}>
                      {isDirty ? "Cancel" : "Back"}
                    </Button> */}
                    <Button
                      loadingText={isEditMode ? "Updating" : "Adding"}
                      colorScheme={"blue"}
                      onClick={handleSubmit(onSubmit)}
                      isLoading={isSubmitting}
                      isDisabled={isValid && !isDirty}
                      type={"submit"}
                    >
                      {isEditMode ? "Update" : "Add"}
                    </Button>
                  </ButtonGroup>
                </Flex>
              </FormControl>
            </ModalFooter>
          </Stack>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default ImpactModal;
