import {
  Box,
  Button,
  Flex,
  Input,
  Image,
  List,
  ListItem,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import slugify from "../../lib/slugify";
import ImpactModal from "components/ImpactModal";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useUpdateImpactPriorityMutation } from "generated-graphql";
import SDGs from "lib/SDGs";

export function ImpactCard({ id, item, onEdit, isMobile }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const SDG = SDGs.find((sdg) => sdg.id === item.sdg);
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* ... */} {/* <ListItem> */}
      <Flex mb={2} background="#eee">
        <Flex
          // justifyContent="space-between"
          color="#fff"
          background={SDG?.color}
          w={{ base: "70px", md: "90px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={`/images/sdg_trim/E-WEB-Goal-${SDG?.id}.png`}
            height={8}
            // mr={1}
          />
          {/* <Text
            p={1}
            ml={2}
            textTransform="uppercase"
            fontSize={20}
            opacity={0.7}
            fontFamily="Oswald"
            fontWeight="600"
          >
            {SDG?.goal}
          </Text> */}
        </Flex>
        <Flex
          p={5}
          pl={5}
          justifyContent="space-between"
          alignItems="center"
          flexGrow={1}
        >
          <Stack spacing={0}>
            <Text
              fontSize={28}
              lineHeight={1}
              fontWeight="900"
              color={SDG?.color}
            >
              {item.prefix}
              {item.value}
              {item.suffix}
            </Text>
            <Text fontSize={16}>{item.indicator}</Text>
          </Stack>
          <Button
            onMouseDown={onEdit}
            // variant="ghost"
            colorScheme="blue"
            mr={1}
            size="sm"
          >
            {isMobile ? "Update" : "Update impact"}
          </Button>
        </Flex>
      </Flex>
      {/* </ListItem> */}
    </div>
  );
}

// import { SortableItem } from "./SortableItem";

function SortableList({
  items: initialItems,
  onOpen,
  setSelectedImpact,
  onChange,
  isMobile,
}) {
  const [items, setItems] = useState(initialItems);
  useEffect(() => setItems(initialItems), [initialItems]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.map(({ id }) => id).indexOf(active.id);
        const newIndex = items.map(({ id }) => id).indexOf(over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        // saveSortOrder(newOrder);
        const changeObject = { target: { name: "impacts", value: newOrder } };
        onChange(changeObject);
        return newOrder;
      });
    }
  }

  if (!items?.length)
    return (
      <Box>
        Tell us the things you have done that have made an impact. Click the
        'add impact' button bellow to record your first impact.
      </Box>
    );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <ImpactCard
            key={item.id}
            id={item.id}
            item={item}
            onEdit={() => {
              setSelectedImpact(item);
              onOpen();
            }}
            isMobile={isMobile}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export type Field = {
  order?: {
    create: number | "hide";
    update: number | "hide";
  };
  id: string;
  label?: string;
  validation?: any;
  element: any;
  placeholder?: string;
  before?: any;
  after?: any;
  custom?: any;
};

const FIELDS: Field[] = [
  // Impact
  {
    order: {
      create: "hide",
      update: 1,
    },
    id: "impacts",
    label: "",
    element: Textarea,
    validation: {},
    custom: ({
      values,
      isEditMode,
      onChange,
      org,
      refetch,
      isMobile,
      setSimulateDirty,
    }) => {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [selectedImpact, setSelectedImpact] = useState(null);
      return (
        <>
          <SortableList
            onOpen={onOpen}
            setSelectedImpact={setSelectedImpact}
            items={org?.impacts}
            onChange={onChange}
            isMobile={isMobile}
          />
          <Flex justifyContent={"flex-end"} pr={3} mt={6}>
            <Button
              colorScheme="blue"
              size={"lg"}
              onClick={() => {
                setSelectedImpact({ indicator: "", value: "", sdg: "" });
                onOpen();
              }}
            >
              Add impact
            </Button>
          </Flex>
          <ImpactModal
            refetchList={refetch}
            isOpen={isOpen}
            onClose={() => {
              setSimulateDirty(true);
              onClose();
            }}
            impact={selectedImpact}
            org={org}
          />
        </>
      );
    },
  },

  // Name
  {
    id: "name",
    label: "Organisation Name",
    order: {
      create: 1,
      update: "hide",
    },
    validation: {
      required: "This is required",
      minLength: {
        value: 4,
        message: "Minimum length should be 4 characters",
      },
    },
    element: Input,
    after: ({ values, isEditMode }) => {
      const linkText = isEditMode
        ? "Share Link: "
        : "Your report will be created at: ";
      const linkURL = `https://globalgood.dev/${slugify(`${values.name}`, {
        lower: true,
      })}`;
      if (!values.name?.length) return null;
      return (
        <Text color={"blue"} fontSize={12} mt={1}>
          <strong>{linkText}</strong>
          <Link href={linkURL}>{linkURL}</Link>
        </Text>
      );
    },
  },

  // Main image
  {
    id: "main_image",
    label: "Main Image",
    element: Input,
    validation: {},
    order: {
      create: 3,
      update: 3,
    },
    custom: ({ values, isEditMode, onChange, ...others }) => {
      return (
        <Flex
          backgroundImage={`url(${values.main_image})`}
          backgroundColor={"#eee"}
          backgroundSize="cover"
          backgroundPosition={"center center"}
          minHeight={{ base: 32, md: 28 }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            colorScheme="blue"
            mt={2}
            onClick={async () => {
              const prompt = window.prompt(
                "Paste image URL here",
                values.main_image
              );
              if (!prompt) return;
              await onChange({ target: { name: "main_image", value: prompt } });
            }}
          >
            {isEditMode ? "Change" : "Upload"}
          </Button>
        </Flex>
      );
    },
  },

  // Short description
  {
    id: "description",
    label: "Short description",
    element: Textarea,
    order: {
      create: 4,
      update: 4,
    },
    validation: {
      required: "This is required",
      minLength: {
        value: 60,
        message: "Minimum length should be 60 characters",
      },
      maxLength: {
        value: 360,
        message: "Maximum length should be 360 characters",
      },
    },
  },

  // Long description
  {
    order: {
      create: 4.5,
      update: 4.5,
    },
    id: "long_description",
    label: "Theory of Change",
    element: Textarea,
    validation: {},
  },

  // Geography
  {
    order: {
      create: 5,
      update: 5,
    },
    id: "geography",
    label: "Geography",
    element: Textarea,
    validation: {},
  },

  // Size
  {
    id: "size",
    label: "Org Size",
    element: Input,
    validation: {},
    order: {
      create: 6,
      update: 6,
    },
  },

  // Founded
  {
    id: "founded_at",
    label: "Date Founded",
    element: Input,
    validation: {},
    order: {
      create: 7,
      update: 7,
    },
  },

  // Links
  {
    id: "link_website",
    label: "Link to Website",
    element: Input,
    validation: {},
    order: {
      create: 8,
      update: 8,
    },
  },
  {
    id: "link_financials",
    label: "Link to Financials",
    element: Input,
    validation: {},
    order: {
      create: 9,
      update: 9,
    },
  },
  {
    id: "link_annual_report",
    label: "Link to Annual Report",
    element: Input,
    validation: {},
    order: {
      create: 9,
      update: 9,
    },
  },
];

export default FIELDS;
