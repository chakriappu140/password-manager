import React, { useEffect, useState } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";
import useApi from "../components/hooks/useApi";
import { getPasswords, deletePassword } from "../utils/api";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

const Dashboard = () => {
  const { data: passwords = [], loading, error, refetch } = useApi(getPasswords);
  const [toastMsg, setToastMsg] = useState("");
  const [selectedPassword, setSelectedPassword] = useState(null);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-6">
      {toastMsg && (
        <Card className="mb-4 text-green-600" onClick={() => setToastMsg("")}>
          {toastMsg}
        </Card>
      )}
      <div className="lg:w-1/3">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Add / Edit Password</h2>
          <PasswordForm
            initial={selectedPassword}
            onSave={() => {
              refetch();
              setToastMsg("Password saved!");
              setSelectedPassword(null);
            }}
          />
        </Card>
      </div>
      <div className="lg:w-2/3">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Your Passwords</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <PasswordList
              passwords={passwords}
              onUpdate={(item) => setSelectedPassword(item)}
              onDelete={async (id) => {
                await deletePassword(id);
                refetch();
                setToastMsg("Deleted successfully");
              }}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
