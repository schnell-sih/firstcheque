import { useUser } from "@/context/UserContext";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";

interface EmployerInfo {
  id: string;
  companyName: string;
  website: string;
}

const EmployerDashboard = () => {
  const { user, role, loading, userInfo } = useUser();
  const [employerInfo, setEmployerInfo] = React.useState<EmployerInfo | null>(
    null
  );
  const supabase = createClient();

  useEffect(() => {
    const fetchEmployerInfo = async () => {
      const { data, error } = await supabase
        .from("employer")
        .select()
        .eq("id", user?.id);

      if (data) {
        setEmployerInfo(data[0]);
      }
    };

    fetchEmployerInfo();
  }, [supabase]);

  return (
    <div className="flex h-screen justify-center items-center">
      <p>Hello, {employerInfo?.companyName}</p>
    </div>
  );
};

export default EmployerDashboard;
