(() => {
    "use strict";

    const searchInput = document.getElementById("project-search");
    const statusFilter = document.getElementById("status-filter");
    const resultsStatus = document.getElementById("results-status");

    if (!searchInput || !statusFilter || !resultsStatus) {
        return;
    }

    const cards = Array.from(document.querySelectorAll(".project-card"));
    const sections = Array.from(document.querySelectorAll(".project-section"));

    function normalizeText(value) {
        return value
            .toLocaleLowerCase("cs-CZ")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function filterProjects() {
        const query = normalizeText(searchInput.value.trim());
        const selectedStatus = statusFilter.value;
        let visibleCount = 0;

        for (const card of cards) {
            const matchesText = normalizeText(card.textContent).includes(query);
            const matchesStatus = selectedStatus === "all" || card.dataset.status === selectedStatus;
            const isVisible = matchesText && matchesStatus;

            card.hidden = !isVisible;
            if (isVisible) {
                visibleCount += 1;
            }
        }

        for (const section of sections) {
            const sectionCards = Array.from(section.querySelectorAll(".project-card"));
            section.hidden = sectionCards.every((card) => card.hidden);
        }

        if (visibleCount === 1) {
            resultsStatus.textContent = "Zobrazen 1 projekt.";
        } else if (visibleCount >= 2 && visibleCount <= 4) {
            resultsStatus.textContent = `Zobrazeny ${visibleCount} projekty.`;
        } else {
            resultsStatus.textContent = `Zobrazeno ${visibleCount} projektů.`;
        }
    }

    searchInput.addEventListener("input", filterProjects);
    statusFilter.addEventListener("change", filterProjects);

    filterProjects();
})();
