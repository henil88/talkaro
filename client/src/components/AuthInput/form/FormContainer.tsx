const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <form className="w-xl bg-zinc-900 py-22 rounded-2xl px-8 flex flex-col gap-8">
    {children}
  </form>
);

export default FormContainer;
