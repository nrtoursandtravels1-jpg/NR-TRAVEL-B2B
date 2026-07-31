import { useNavigate } from "react-router-dom";
import PackageForm from "../../components/package/PackageForm";

function CreatePackage() {
  const navigate = useNavigate();

  function handleSuccess() {
    alert("Package created successfully.");
    navigate("/packages");
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            color: "#0f172a",
          }}
        >
          Create Tour Package
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          Add a new Domestic or International Tour Package.
        </p>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        <PackageForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default CreatePackage;