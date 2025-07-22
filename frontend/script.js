const form = document.getElementById("feedbackForm");
const list = document.getElementById("feedbackList");
 
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
 
  await fetch("http://localhost:3000/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  });
 
  form.reset();
  loadFeedback();
});
 
async function loadFeedback() {
  const res = await fetch("http://localhost:3000/feedback");
  const data = await res.json();
 
  list.innerHTML = data.map(f => `
<div class="feedback-item">
<strong>${f.name}</strong><br>
<span>${f.message}</span>
</div>
  `).join("");
}
 
loadFeedback();