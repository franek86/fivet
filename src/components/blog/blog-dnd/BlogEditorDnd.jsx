import { useDraggable } from "@dnd-kit/react";
import { useState } from "react";

const initialData = {
  rows: [
    {
      id: "row-1",
      columns: [
        {
          id: "col-1",
          width: 6,
          blocks: [
            {
              id: "block-1",
              type: "text",
              content: {
                text: "Hello world",
              },
            },
          ],
        },
        {
          id: "col-2",
          width: 6,
          blocks: [
            {
              id: "block-2",
              type: "image",
              content: {
                url: "/cat.jpg",
              },
            },
          ],
        },
      ],
    },
  ],
};

const BlogEditorDnd = () => {
  const { ref } = useDraggable({
    id: "test",
  });

  const [data, setData] = useState(initialData);

  const handleDragEnd = (event) => {
    const {} = event;
  };

  return <div ref={ref}>BlogEditorDnd</div>;
};

export default BlogEditorDnd;
