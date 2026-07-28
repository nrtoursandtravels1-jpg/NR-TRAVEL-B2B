function Modal({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}

export default Modal;