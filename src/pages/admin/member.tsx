import React, { useState } from "react";
import AdminPage from ".";
import MemberList from "@/components/admin/MemberList";

export default function MemberPage() {
  return <AdminPage content={<MemberList />} />;
}
