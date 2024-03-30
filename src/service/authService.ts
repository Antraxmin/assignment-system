async function login(studentId: string, password: string) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId, password }),
  });

  if (!response.ok) {
    throw new Error("로그인 실패");
  }

  return response.json();
}

interface LoginData {
  studentId: string;
  password: string;
}

async function loginAdmin({ studentId, password }: LoginData) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId, password, isAdmin: true }),
  });

  if (!response.ok) {
    throw new Error("관리자 로그인 실패");
  }

  return response.json();
}

export { login, loginAdmin };
