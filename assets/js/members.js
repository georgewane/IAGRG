window.loadMembers = function(stateName){

  const title = document.getElementById("stateTitle");
  const list = document.getElementById("memberList");

  const matches = window.memberData.filter(
    m => m.state.toLowerCase() === stateName.toLowerCase()
  );

  title.textContent = `${stateName} (${matches.length})`;

  if(matches.length === 0){
    list.innerHTML = '<p class="empty-state">No members listed yet.</p>';
    return;
  }

  const grouped = {};

  matches.forEach(m => {
    const inst = (m.institution || "Private").trim();
    if(!grouped[inst]) grouped[inst] = [];
    grouped[inst].push(m.name);
  });

  let html = "";

  const sortedInstitutions = Object.keys(grouped).sort((a,b) => {

    const aPrivate = a.toLowerCase() === "private";
    const bPrivate = b.toLowerCase() === "private";

    if(aPrivate && !bPrivate) return 1;
    if(!aPrivate && bPrivate) return -1;

    return a.localeCompare(b);
  });

  sortedInstitutions.forEach(inst => {

    const count = grouped[inst].length;

    html += `
      <div class="institution-card">
        <div class="institution-name">${inst} (${count})</div>
        <ul class="member-sublist">
          ${grouped[inst].map(n => `<li>${n}</li>`).join("")}
        </ul>
      </div>
    `;

  });

  list.innerHTML = html;
};