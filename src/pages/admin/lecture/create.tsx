import CreateLectureForm from "@/components/admin/CreateLectureForm";
import AdminPage from "..";

export default function LecturePage() {
  return <AdminPage content={<CreateLectureForm />} />;
}
