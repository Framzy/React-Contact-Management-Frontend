import { useEffect, useState } from "react";
import { Link } from "react-router";
import { contactDelete } from "../../lib/api/ContactApi";
import useGetPages from "../../hooks/useGetPages";
import useDelete from "../../hooks/useDelete";
import useToggleAnimation from "../../hooks/useToggleAnimation";
import useFetchContactList from "../../hooks/useFetchContactList";

export default function ContactList() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);

  const { toggle, contentRef, iconRef } = useToggleAnimation(300);
  const { getPages } = useGetPages();
  const pages = getPages(totalPage, page);

  const { handleDelete: handleContactDelete } = useDelete(contactDelete, {
    confirmMessage: "Are you sure you want to delete this contact?",
    successMessage: "Contact deleted successfully",
    errorMessage: "Failed to delete contact. Please try again.",
  });

  async function handleDelete(id) {
    await handleContactDelete(id);
    setReload(!reload);
  }

  async function handleSearchContact(e) {
    e.preventDefault();
    setPage(1);
    setReload(!reload);
  }

  async function handlePageChange(page) {
    setPage(page);
    setReload(!reload);
  }

  const { fetchContacts } = useFetchContactList(
    {
      name,
      email,
      phone,
      page,
    },
    setContacts,
    setTotalPage
  );

  useEffect(() => {
    fetchContacts();
  }, [page, name, email, phone, reload]); // eslint-disable-line

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <i className="fas fa-users text-blue-400 text-2xl mr-3" />
          <h1 className="text-2xl font-bold text-white">My Contacts</h1>
        </div>
        {/* Search form */}
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <i className="fas fa-search text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Search Contacts
              </h2>
            </div>
            <button
              type="button"
              onClick={toggle}
              className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200"
            >
              <i className="fas fa-chevron-down text-lg" ref={iconRef} />
            </button>
          </div>
          <div ref={contentRef} className="mt-4">
            <form onSubmit={handleSearchContact}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label
                    htmlFor="search_name"
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="search_name"
                      name="search_name"
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Search by name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="search_email"
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-envelope text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="search_email"
                      name="search_email"
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Search by email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="search_phone"
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-phone text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="search_phone"
                      name="search_phone"
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Search by phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 text-right">
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
                >
                  <i className="fas fa-search mr-2" /> Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Contact cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Contact Card */}
          <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
            <Link to="/dashboard/contacts/create" className="block p-6 h-full">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <i className="fas fa-user-plus text-3xl text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Create New Contact
                </h2>
                <p className="text-gray-300">Add a new contact to your list</p>
              </div>
            </Link>
          </div>

          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
            >
              <div className="p-6">
                <Link
                  to={`/dashboard/contacts/${contact.id}`}
                  className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <i className="fas fa-user text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">
                      {contact.first_name} {contact.last_name}
                    </h2>
                  </div>
                  <div className="space-y-3 text-gray-300 ml-2">
                    <p className="flex items-center">
                      <i className="fas fa-user-tag text-gray-500 w-6" />
                      <span className="font-medium w-24">First Name:</span>
                      <span>{contact.first_name}</span>
                    </p>
                    <p className="flex items-center">
                      <i className="fas fa-user-tag text-gray-500 w-6" />
                      <span className="font-medium w-24">Last Name:</span>
                      <span>{contact.last_name}</span>
                    </p>
                    <p className="flex items-center">
                      <i className="fas fa-envelope text-gray-500 w-6" />
                      <span className="font-medium w-24">Email:</span>
                      <span>{contact.email}</span>
                    </p>
                    <p className="flex items-center">
                      <i className="fas fa-phone text-gray-500 w-6" />
                      <span className="font-medium w-24">Phone:</span>
                      <span>{contact.phone}</span>
                    </p>
                  </div>
                </Link>
                <div className="mt-4 flex justify-end space-x-3">
                  <Link
                    to={`/dashboard/contacts/${contact.id}/edit`}
                    className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                  >
                    <i className="fas fa-edit mr-2" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="px-4 py-2 bg-linear-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                  >
                    <i className="fas fa-trash-alt mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center ">
          <nav className="flex flex-wrap gap-2 justify-center items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
            {/* Previous button */}
            {page > 1 && (
              <button
                onClick={() => handlePageChange(page - 1)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center hover:cursor-pointer"
              >
                <i className="fas fa-chevron-left mr-2" /> Previous
              </button>
            )}

            {/* Page numbers */}
            {pages.map((value, index) => {
              if (value === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-4 py-2 text-gray-400 cursor-default select-none"
                  >
                    ...
                  </span>
                );
              }

              const isActive = value === page;

              return (
                <button
                  key={value}
                  onClick={() => handlePageChange(value)}
                  className={`px-4 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 hover:cursor-pointer ${
                    isActive
                      ? "bg-gradient text-white font-medium shadow-md hover:opacity-90 "
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {value}
                </button>
              );
            })}

            {/* Next button */}
            {page < totalPage && (
              <button
                onClick={() => handlePageChange(page + 1)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center hover:cursor-pointer"
              >
                Next <i className="fas fa-chevron-right ml-2" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
