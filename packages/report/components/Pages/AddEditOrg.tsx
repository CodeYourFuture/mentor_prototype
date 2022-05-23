import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import {
  useDeleteOrgMutation,
  useInsertOrgMutation,
  useUpdateImpactPriorityMutation,
  useUpdateOrgMutation,
} from "generated-graphql";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import Content from "components/Content";
import { useFetchOrgQuery } from "generated-graphql";
import router, { useRouter } from "next/router";
import { DeleteIcon } from "@chakra-ui/icons";
import slugify from "../../lib/slugify";
import Loader from "components/Loader";
import { useForm } from "react-hook-form";
import FIELDS from "./AddEditOrg.form";

const AddEditOrgForm = ({ org, refetch, isLoading }) => {
  console.log("initial", org);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    defaultValues: {
      ...org,
      main_image: "",
    },
  });

  const router = useRouter();

  const [updateImpactPriority, { error, loading }] =
    useUpdateImpactPriorityMutation();
  useEffect(() => !isLoading && reset(org), [isLoading]);
  const values = watch();
  // const [isSubmitted, setIsSubmitted] = useState("");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [session] = useSession();
  const [simulateDirty, setSimulateDirty] = useState(false);
  const isEditMode = !!org;
  const isNewImpactMode = router.query.mode === "impact";
  // console.log({ values });

  const [insertOrg, { loading: insertOrgFetching, error: insertOrgError }] =
    useInsertOrgMutation();
  const [updateOrg, { loading: updateOrgFetching, error: updateOrgError }] =
    useUpdateOrgMutation();
  const [deleteOrg, { loading: deleteOrgFetching, error: deleteOrgError }] =
    useDeleteOrgMutation({ variables: { id: org?.id } });

  if (!session) return <AccessDeniedIndicator message="Please sign in" />;

  const isUpdating =
    insertOrgFetching || updateOrgFetching || deleteOrgFetching;

  // if (insertOrgError || updateOrgError || deleteOrgError) {
  // console.error({ insertOrgError, updateOrgError, deleteOrgError });
  // }
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this org?")) return;
    // setIsSubmitted("deleting");
    await deleteOrg();
    router.push(`/orgs`);
  };

  const onSubmit = async (values) => {
    values.slug = slugify(values.name);
    // setIsSubmitted(isEditMode ? "Updating report" : "Creating report");
    try {
      if (isEditMode) {
        for (const [index, item] of (values.impacts || []).entries()) {
          // values.impacts.forEach(async (item, index) => {
          // set the index in the db
          const variables = { impactID: item.id, priority: index };
          try {
            await updateImpactPriority({ variables });
          } catch (error) {
            console.error(error);
          }
        }
        await updateOrg({
          variables: {
            id: org.id,
            ...values,
          },
        });
        router.reload();
        // router.push(`/${values.slug}`);
      } else {
        await insertOrg({ variables: { author_id: session.id, ...values } });
        router.push(`/${values.slug}/edit?mode=impact`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const errorNode = () => {
    if (!insertOrgError) return false;
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{insertOrgError}</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };
  const mode = isEditMode ? "update" : "create";

  // if (isSubmitting || isUpdating) {
  //   return <Loader />;
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} my={28}>
        {errorNode()}
        <Box maxW={760}>
          <Stack spacing={4}>
            {mode === "update" &&
              (isNewImpactMode ? (
                <Heading size="lg">What impact have you made?</Heading>
              ) : (
                <Heading size="lg">Editing {values.name}</Heading>
              ))}
            {/* Fields */}
            {FIELDS?.filter(({ order }) => order[mode] !== "hide")
              .filter((field) =>
                isNewImpactMode ? field.id === "impacts" : true
              )
              .sort((a, b) => {
                if (a.order[mode] > b.order[mode]) return 1;
                if (a.order[mode] < b.order[mode]) return -1;
                return 0;
              })
              .map((field) => (
                <Box key={field.id} paddingBottom={8}>
                  <FormControl isInvalid={errors[field.id]}>
                    {field.before && (
                      <field.before values={values} isEditMode={isEditMode} />
                    )}
                    <FormLabel
                      style={{ fontSize: 22 }}
                      htmlFor={errors[field.id]}
                    >
                      {field.label}
                    </FormLabel>
                    {field.custom ? (
                      <field.custom
                        id={field.id}
                        values={values}
                        isEditMode={isEditMode}
                        isMobile={isMobile}
                        org={org}
                        refetch={refetch}
                        setSimulateDirty={setSimulateDirty}
                        {...register(field.id, field.validation)}
                      />
                    ) : (
                      <field.element
                        org={org}
                        autoComplate="off"
                        id={field.id}
                        placeholder={field.placeholder}
                        {...register(field.id, field.validation)}
                      />
                    )}
                    <FormErrorMessage>
                      {errors[field.id] && errors[field.id].message}
                    </FormErrorMessage>
                    {field.after && (
                      <field.after values={values} isEditMode={isEditMode} />
                    )}
                  </FormControl>
                </Box>
              ))}

            {isEditMode && !isNewImpactMode && (
              <Box paddingBottom={32}>
                <Text style={{ fontSize: 22, color: "firebrick" }}>
                  Danger Zone
                </Text>
                <Button
                  marginRight={"auto"}
                  colorScheme="red"
                  variant="outline"
                  leftIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Delete{!isMobile ? " Organisation" : " Org"}
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
      {/* Buttons */}

      <FormControl
        position="fixed"
        zIndex={3}
        background={"black"}
        left={0}
        top={{ base: 0, md: 0 }}
        // bottom={{ base: "auto", md: 0 }}
        p={6}
      >
        <Content isFull>
          <Flex
            maxW={760}
            justifyContent={isDirty ? "flex-end" : "space-between"}
          >
            <Button
              variant={isDirty ? "outline" : "ghost"}
              colorScheme="gray"
              color={"gray"}
              onClick={() =>
                isEditMode ? router.push(`/${org.slug}`) : router.back()
              }
            >
              {!isEditMode || isDirty ? "Cancel" : "← Back to report"}
            </Button>
            <Button
              loadingText="Saving..."
              colorScheme={"gray"}
              minW={150}
              onClick={(...args) => handleSubmit(args as any)}
              isLoading={isSubmitting}
              isDisabled={isValid && !isDirty && !simulateDirty}
              type={"submit"}
              ml={3}
            >
              {isEditMode ? "Save" : isNewImpactMode ? "Add" : "Next"}
            </Button>
          </Flex>
        </Content>
      </FormControl>
    </form>
  );
};

const AddEditOrgPage = () => {
  const router = useRouter();
  const { data, error, loading, refetch } = useFetchOrgQuery({
    variables: { slug: `${router?.query.slug}` },
  });
  const [org] = data?.orgs || [];
  return (
    <Content>
      <AddEditOrgForm org={org} refetch={refetch} isLoading={loading} />
    </Content>
  );
};

export default AddEditOrgPage;
