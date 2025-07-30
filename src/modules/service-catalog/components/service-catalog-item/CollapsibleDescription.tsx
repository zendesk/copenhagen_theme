import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";
import ChevronUp from "@zendeskgarden/svg-icons/src/16/chevron-up-fill.svg";
import ChevronDown from "@zendeskgarden/svg-icons/src/16/chevron-down-fill.svg";
import { useTranslation } from "react-i18next";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { XXXL } from "@zendeskgarden/react-typography";
import { ItemThumbnail } from "../item-thumbnail/ItemThumbnail";

const DescriptionWrapper = styled.div`
  border-bottom: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  padding-bottom: ${(props) => props.theme.space.lg};
  margin-inline-end: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-end: 0;
  }
`;

const ItemTitle = styled(XXXL)`
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin-bottom: 0;
  overflow-wrap: break-word;
  max-width: 100%;
`;

const CollapsibleText = styled.div<{ isCollapsed: boolean }>`
  font-size: ${(props) => props.theme.fontSizes.md};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.isCollapsed ? 3 : "none")};
  overflow: hidden;
  margin-top: ${(props) => props.theme.space.md};
  padding-inline-end: ${(props) => props.theme.space.xl};
  overflow-wrap: break-word;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-inline-end: 0;
  }
`;

const ToggleButton = styled(Button)`
  margin-top: ${(props) => props.theme.space.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.space.md};
`;

interface CollapsibleDescriptionProps {
  title: string;
  description: string;
  thumbnailUrl: string;
}

export const CollapsibleDescription = ({
  title,
  description,
  thumbnailUrl,
}: CollapsibleDescriptionProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isClamped, setIsClamped] = useState<boolean>(false);
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      const checkClamped = () => {
        const visibleBoxHeight = el.getBoundingClientRect().height;
        const fullContentHeight = el.scrollHeight;
        const clamped = fullContentHeight - visibleBoxHeight > 1;
        setIsClamped(clamped);
        if (!clamped) {
          setIsCollapsed(false);
        }
      };
      requestAnimationFrame(checkClamped);
    }
  }, [description]);

  const toggleDescription = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <DescriptionWrapper>
      <HeaderContainer>
        <ItemThumbnail size="large" url={thumbnailUrl} />
        <ItemTitle tag="h1">{title}</ItemTitle>
      </HeaderContainer>
      {description && (
        <CollapsibleText
          ref={contentRef}
          className="service-catalog-description"
          isCollapsed={isCollapsed}
          dangerouslySetInnerHTML={{ __html: description }}
        ></CollapsibleText>
      )}
      {isClamped && (
        <ToggleButton isLink onClick={toggleDescription}>
          {!isCollapsed
            ? t("service-catalog.item.read-less", "Read less")
            : t("service-catalog.item.read-more", "Read more")}
          <Button.EndIcon>
            {!isCollapsed ? <ChevronUp /> : <ChevronDown />}
          </Button.EndIcon>
        </ToggleButton>
      )}
    </DescriptionWrapper>
  );
};
