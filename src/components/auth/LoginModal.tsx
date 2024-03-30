import React from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginModal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
            <div className="text-center p-5 flex-auto justify-center">
              <h2 className="text-xl font-bold py-4 ">권한이 없습니다</h2>
              <p className="text-sm text-gray-500 px-8">
                이 페이지에 접근할 수 있는 권한이 없습니다. 관리자에게
                문의하세요.
              </p>
            </div>
            <div className="p-3  mt-2 text-center space-x-4 md:block">
              <button
                className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
                onClick={() => setShowModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginModal;
