<td style={tdStyle}>

  <button
    onClick={() => setSelectedLead(lead)}
    style={{
      padding: "6px 12px",
      marginRight: "8px",
      background: "green",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Edit
  </button>


  <button
    onClick={() => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this lead?"
      );

      if (confirmDelete) {
        deleteLead(lead.id);
      }
    }}
    style={{
      padding: "6px 12px",
      background: "red",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      display: "inline-block"
    }}
  >
    Delete
  </button>


</td>