import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const isCertified = ["YES", "NO"];
  return {
    itemName: namor.generate({ words: 1, numbers: 0 }),
    sku: Math.floor(Math.random() * 10000),
    ean: Math.floor(Math.random() * 10000),
    quantity: Math.floor(Math.random() * 100),
    singlePrice: Math.floor(Math.random() * 100),
    packagePrice: Math.floor(Math.random() * 100),
    discount: Math.floor(Math.random() * 100) + "%",
    lbCertified: isCertified[Math.floor(Math.random() * isCertified.length)],
    bioCertifed: isCertified[Math.floor(Math.random() * isCertified.length)]
  };
};

const columns = [
  {
    label: "Item Name",
    accessor: "itemName"
  },
  {
    label: "SKU",
    accessor: "sku"
  },
  {
    label: "EAN",
    accessor: "ean"
  },
  {
    label: "Quantity",
    accessor: "quantity"
  },
  {
    label: "Single Price",
    accessor: "singlePrice"
  },
  {
    label: "Package Price",
    accessor: "packagePrice"
  },
  {
    label: "Discount",
    accessor: "discount"
  },
  {
    label: "LB Certified",
    accessor: "lbCertified"
  },
  {
    label: "BIO Certified",
    accessor: "bioCertifed"
  }
];

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return { data: makeDataLevel(), columns: columns };
}
