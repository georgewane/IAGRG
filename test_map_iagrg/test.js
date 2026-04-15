/* ======================================
   IAGRG MEMBERS MAP (for in.svg)
   Hoverable + Clickable + Grouped Members
====================================== */

document.addEventListener("DOMContentLoaded", () => {

  const map = document.getElementById("indiaMap");
  const title = document.getElementById("stateTitle");
  const list = document.getElementById("memberList");

  /* SVG State Code → Full Name */
  const stateMap = {
    INAN: "Andaman and Nicobar",
    INAP: "Andhra Pradesh",
    INAR: "Arunachal Pradesh",
    INAS: "Assam",
    INBR: "Bihar",
    INCH: "Chandigarh",
    INCT: "Chhattisgarh",
    INDH: "Dadra and Nagar Haveli and Daman and Diu",
    INDL: "Delhi",
    INGA: "Goa",
    INGJ: "Gujarat",
    INHP: "Himachal Pradesh",
    INHR: "Haryana",
    INJH: "Jharkhand",
    INJK: "Jammu and Kashmir",
    INKA: "Karnataka",
    INKL: "Kerala",
    INLA: "Ladakh",
    INLD: "Lakshadweep",
    INMH: "Maharashtra",
    INML: "Meghalaya",
    INMN: "Manipur",
    INMP: "Madhya Pradesh",
    INMZ: "Mizoram",
    INNL: "Nagaland",
    INOR: "Odisha",
    INPB: "Punjab",
    INPY: "Puducherry",
    INRJ: "Rajasthan",
    INSK: "Sikkim",
    INTG: "Telangana",
    INTN: "Tamil Nadu",
    INTR: "Tripura",
    INUP: "Uttar Pradesh",
    INUT: "Uttarakhand",
    INWB: "West Bengal"
  };

  const DEFAULT_COLOR = "#D8DEE6";
  const HOVER_COLOR   = "#FCA311";
  const ACTIVE_COLOR  = "#14213D";

  let activeState = null;

  /* Wait until SVG loads */
  map.addEventListener("load", () => {

    const svg = map.contentDocument;

    /* Works for path / polygon / g */
    const states = svg.querySelectorAll("[id]");

    states.forEach(state => {

      const code = state.id;

      if (!stateMap[code]) return;

      state.style.cursor = "pointer";
      state.style.transition =
        "fill .18s ease, opacity .18s ease, transform .18s ease";

      /* Set default fill */
      applyFill(state, DEFAULT_COLOR);

      /* Hover */
      state.addEventListener("mouseenter", () => {

        if (activeState === state) return;

        applyFill(state, HOVER_COLOR);
        state.style.opacity = "0.95";

      });

      /* Leave */
      state.addEventListener("mouseleave", () => {

        if (activeState === state) return;

        applyFill(state, DEFAULT_COLOR);
        state.style.opacity = "1";

      });

      /* Click */
      state.addEventListener("click", () => {

        /* reset old active */
        if (activeState) {
          applyFill(activeState, DEFAULT_COLOR);
          activeState.style.opacity = "1";
        }

        activeState = state;

        applyFill(state, ACTIVE_COLOR);
        state.style.opacity = "1";

        loadMembers(stateMap[code]);

      });

    });

  });

  /* Apply fill to group OR direct path */
  function applyFill(el, color){

    el.style.fill = color;

    const children = el.querySelectorAll("path, polygon, rect, circle");

    children.forEach(child => {
      child.style.fill = color;
    });

  }

  /* Load member panel */
  function loadMembers(stateName){

    const matches = window.memberData.filter(
      m => m.state &&
      m.state.toLowerCase() === stateName.toLowerCase()
    );

    title.textContent = `${stateName} (${matches.length})`;

    if(matches.length === 0){
      list.innerHTML =
        '<p class="empty-state">No members listed yet.</p>';
      return;
    }

    /* Group by institution */
    const grouped = {};

    matches.forEach(member => {

      const inst = member.institution
        ? member.institution.trim()
        : "Independent";

      if(!grouped[inst]) grouped[inst] = [];

      grouped[inst].push(member);

    });

    /* Sort institutions alphabetically */
    const institutions =
      Object.keys(grouped).sort((a,b)=>a.localeCompare(b));

    let html = "";

    institutions.forEach(inst => {

      const members = grouped[inst]
        .sort((a,b)=>a.name.localeCompare(b.name));

      html += `
        <div class="institution-card">

          <div class="institution-name">
            ${inst} (${members.length})
          </div>

          <ul class="member-sublist">
            ${members.map(m => `
              <li>${m.name}</li>
            `).join("")}
          </ul>

        </div>
      `;

    });

    list.innerHTML = html;

  }

});
