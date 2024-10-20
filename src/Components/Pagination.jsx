export default function Pagination({
  divClass,
  active,
  inactive,
  totalPages,
  currentPage,
}) {
  return (
    <div className={divClass}>
      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index}
          className={index === currentPage - 1 ? active : inactive}
        ></span>
      ))}
    </div>
  );
}
