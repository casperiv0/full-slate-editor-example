import * as RToolbar from "@radix-ui/react-toolbar";
import {
  ListCheck,
  ListUl,
  Quote,
  TextCenter,
  TypeBold,
  TypeH1,
  TypeH2,
  TypeH3,
  TypeItalic,
  TypeStrikethrough,
  TypeUnderline,
  JustifyRight,
  JustifyLeft,
  Code,
  Link,
  Hr,
  ListOl,
} from "react-bootstrap-icons";
import { useSlate } from "slate-react";
import { Button } from "../Button";
import classNames from "classnames";
import { isBlockActive, toggleMark, toggleBlock, isMarkActive } from "../../lib/editor/blocks";
import { ElementType, SlateFormat, Text } from "../editor/types";
import { isLinkActive, unwrapLink, wrapLink } from "../../lib/editor-plugins/withLinks";

export function Toolbar() {
  return (
    <RToolbar.Root className="flex flex-wrap gap-1 mb-5 mt-2">
      <RToolbar.ToolbarToggleGroup
        className="flex gap-1"
        type="multiple"
        aria-label="Text formatting"
      >
        <MarkButton format="bold" icon={<TypeBold aria-label="bold" />} />
        <MarkButton format="italic" icon={<TypeItalic aria-label="italic" />} />
        <MarkButton format="underline" icon={<TypeUnderline aria-label="underline" />} />
        <MarkButton
          format="strikethrough"
          icon={<TypeStrikethrough aria-label="strikethrough" />}
        />
        <MarkButton format="inline-code" icon={<Code aria-label="inline-code" />} />
        <LinkButton icon={<Link aria-label="link" />} />
      </RToolbar.ToolbarToggleGroup>
      <RToolbar.Separator className="w-[1px] bg-neutral-400 dark:bg-gray-3 mx-1 text-justify" />
      <RToolbar.ToolbarToggleGroup
        aria-label="Block formatting"
        className="flex gap-1"
        type="single"
      >
        <BlockButton format={ElementType.H1} icon={<TypeH1 aria-label="heading-one" />} />
        <BlockButton format={ElementType.H2} icon={<TypeH2 aria-label="heading-two" />} />
        <BlockButton format={ElementType.H3} icon={<TypeH3 aria-label="heading-three" />} />
        <BlockButton format={ElementType.Blockquote} icon={<Quote aria-label="block-quote" />} />
        <BlockButton
          format={ElementType.BulletedList}
          icon={<ListUl aria-label="bulleted-list" />}
        />
        <BlockButton
          format={ElementType.NumberedList}
          icon={<ListOl aria-label="numbered-list" />}
        />
        <BlockButton
          format={ElementType.CheckListItem}
          icon={<ListCheck aria-label="check-list" />}
        />
        <BlockButton format={ElementType.Delimiter} icon={<Hr aria-label="delimiter" />} />
      </RToolbar.ToolbarToggleGroup>

      <RToolbar.Separator className="w-[1px] bg-neutral-400 dark:bg-gray-3 mx-1 text-justify" />
      <RToolbar.ToolbarToggleGroup
        aria-label="Text formatting"
        className="flex gap-1"
        type="single"
      >
        <BlockButton format="text-left" icon={<JustifyLeft aria-label="text-left" />} />
        <BlockButton format="text-right" icon={<JustifyRight aria-label="text-right" />} />
        <BlockButton format="text-center" icon={<TextCenter aria-label="text-center" />} />
      </RToolbar.ToolbarToggleGroup>
    </RToolbar.Root>
  );
}

interface BlockButtonProps {
  format: SlateFormat;
  icon: React.ReactNode;
}

export function BlockButton({ format, icon }: BlockButtonProps) {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  return (
    <RToolbar.ToolbarToggleItem asChild value={format}>
      <Button
        title={format}
        type="button"
        variant={isActive ? null : "default"}
        className={classNames(isActive && "text-white bg-neutral-700")}
        onClick={() => toggleBlock(editor, format)}
      >
        {icon}
      </Button>
    </RToolbar.ToolbarToggleItem>
  );
}

interface MarkButtonProps {
  format: keyof Omit<Text, "text">;
  icon: React.ReactNode;
}

export function MarkButton({ format, icon }: MarkButtonProps) {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <RToolbar.ToolbarToggleItem asChild value={format}>
      <Button
        title={format}
        type="button"
        variant={isActive ? null : "default"}
        className={classNames(isActive && "text-white bg-neutral-700")}
        onClick={() => toggleMark(editor, format)}
      >
        {icon}
      </Button>
    </RToolbar.ToolbarToggleItem>
  );
}

export function LinkButton({ icon }: Omit<MarkButtonProps, "format">) {
  const editor = useSlate();
  const isActive = isLinkActive(editor);

  function handleAdd() {
    if (isActive) {
      // remove the link if it's present
      unwrapLink(editor);
      return;
    }

    const url = window.prompt("Enter the URL of the link:");
    if (!url) return;

    if (editor.selection) {
      wrapLink(editor, url);
    }
  }

  return (
    <RToolbar.ToolbarToggleItem asChild value="link">
      <Button
        title="Link"
        type="button"
        variant={isActive ? null : "default"}
        className={classNames(isActive && "text-white bg-neutral-700")}
        onClick={handleAdd}
      >
        {icon}
      </Button>
    </RToolbar.ToolbarToggleItem>
  );
}
