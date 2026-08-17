function RequiredMark() {
  return (
    <>
      <span
        aria-hidden="true"
        className="mt-1 inline-block size-1 rounded-full bg-primitive-red-400"
      />
      <span className="sr-only">필수</span>
    </>
  );
}

export default RequiredMark;
