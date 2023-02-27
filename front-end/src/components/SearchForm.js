import React from "react";
import { useFormik } from "formik";

const SearchForm = ({ onSearch }) => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      onSearch(values.search); // Anropa funktionen onSearch med söktermen som argument
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="search"
        value={formik.values.search}
        onChange={formik.handleChange}
      />
      <button type="submit">Sök</button>
    </form>
  );
};

export default SearchForm;
