import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import AddUser from "../../components/admin/AddUser";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);


  const fetchUsers = async () => {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {
      console.log("Supabase Error:", error);
      return;
    }

    setUsers(data || []);

  };


  useEffect(() => {
    fetchUsers();
  }, [refresh]);



  return (
    <div style={{ padding: "30px" }}>

      <h1>User Management</h1>

      <p>
        Manage NR Travel CRM users
      </p>


      {/* Add User Form */}

      <AddUser
        onUserAdded={() => setRefresh(!refresh)}
      />



      {/* User Count Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        <div>
          <h2>{users.length}</h2>
          <p>Total Users</p>
        </div>


        <div>
          <h2>
            {
              users.filter(
                user => user.role === "admin"
              ).length
            }
          </h2>
          <p>Admin</p>
        </div>


        <div>
          <h2>
            {
              users.filter(
                user => user.role === "agent"
              ).length
            }
          </h2>
          <p>B2B Agents</p>
        </div>


        <div>
          <h2>
            {
              users.filter(
                user => user.role === "customer"
              ).length
            }
          </h2>
          <p>Customers</p>
        </div>


      </div>



      {/* Users Table */}

      <h2 style={{ marginTop:"30px" }}>
        User List
      </h2>


      <table width="100%" border="1">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>


        <tbody>

        {
          users.map((user)=>(
            <tr key={user.id}>

              <td>{user.full_name}</td>

              <td>{user.email}</td>

              <td>{user.phone}</td>

              <td>{user.role}</td>

              <td>{user.status}</td>

            </tr>
          ))
        }

        </tbody>

      </table>


    </div>
  );
}