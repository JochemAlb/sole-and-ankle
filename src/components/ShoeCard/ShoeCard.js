import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variants = {
    "on-sale": {
      bgColor: COLORS.primary,
      label: "Sale",
      decoration: "line-through",
    },
    "new-release": {
      bgColor: COLORS.secondary,
      label: "Just released!",
      decoration: "none",
    },
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant !== "default" && (
            <Badge
              style={{
                "--bg-color": variants[variant].bgColor,
              }}
            >
              {variants[variant].label}
            </Badge>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{ "--decoration": variants[variant]?.decoration }}>
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && <SalePrice>{formatPrice(price)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Badge = styled.div`
  position: absolute;
  top: 10px;
  right: -5px;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
  padding: 6px 12px;
  border-radius: 4px;
  background-color: var(--bg-color);
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 20%;
  min-width: 200px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  display: block;
`;

export default ShoeCard;
