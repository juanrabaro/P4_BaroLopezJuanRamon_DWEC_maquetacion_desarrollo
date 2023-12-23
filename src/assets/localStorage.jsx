export function uploadUser(newUsers) {
  localStorage.setItem("users", JSON.stringify(newUsers))
}

export function bringUsers() {
  return JSON.parse(localStorage.getItem("users")) || []
}
