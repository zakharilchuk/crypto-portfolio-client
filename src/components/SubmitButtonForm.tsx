function SubmitButtonForm({text}: {text: string}) {
  return <button type="submit" className="bg-black text-white px-4 py-2 cursor-pointer hover:opacity-85 w-full">{text}</button>;
}

export default SubmitButtonForm;