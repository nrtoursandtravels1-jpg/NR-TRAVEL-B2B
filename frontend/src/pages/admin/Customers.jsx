import { useState } from "react";

import CustomerForm from "../../components/customer/CustomerForm";
import CustomerTable from "../../components/customer/CustomerTable";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";

function Customers() {
  const [refresh, setRefresh] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customerSaved = () => {
    setRefresh((prev) => !prev);
    setSelectedCustomer(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader
          title="Customer Management"
          description="Add, edit and manage all customers."
        />

        {/* Customer Form */}
        <CustomerForm
          selectedCustomer={selectedCustomer}
          onCustomerAdded={customerSaved}
        />

        {/* Customer Table */}
        <CustomerTable
          refresh={refresh}
          setSelectedCustomer={setSelectedCustomer}
        />
      </div>
    </DashboardLayout>
  );
}

export default Customers;
