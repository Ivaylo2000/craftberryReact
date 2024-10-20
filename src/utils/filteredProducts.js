export const filteredProducts = (products, answers) => {
  if (
    !Array.isArray(products) ||
    products.length === 0 ||
    !answers ||
    Object.keys(answers).length === 0
  ) {
    return [];
  }

  const answerEntries = Object.entries(answers).map(([_, answer]) =>
    answer.trim().toLowerCase()
  );

  console.log("Answer Entries:", answerEntries);
  console.log("Products before filtering:", products);

  return products.filter((product) => {
    const tags = product.tags || [];
    const bodyHtml = product.body_html || "";

    return answerEntries.some((answer) => {
      const tagMatch = tags.map((tag) => tag.toLowerCase()).includes(answer);
      const bodyHtmlMatch = bodyHtml.toLowerCase().includes(answer);

      return tagMatch || bodyHtmlMatch;
    });
  });
};
