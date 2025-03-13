document.addEventListener("DOMContentLoaded", function () {
    const packageRates = {
        "Basic": 1999,
        "Standard": 2299,
        "Premium": 2499,
        "Luxury": 2999
    };

    const floorsSelect = document.getElementById("floorsSelect");
    const packageSelect = document.getElementById("packageSelect");
    const tableBody = document.querySelector("table");
    const totalCostElement = document.getElementById("totalCost");

    const baseWorks = [
        { name: "Size of RCC Water Sump (A 4 Member family will require 9000 liter capacity)", unit: "ltr", rate: 24 },
        { name: "Size of Septic Tank", unit: "ltr", rate: 24 },
        { name: "Plain Compound Wall", unit: "sqft", rate: 425, isCompoundWall: true }
    ];

    function generateTableRows() {
        const selectedFloors = parseInt(floorsSelect.value) || 0;
        let workRows = "";

        // ✅ Always show Ground Floor
        workRows += `
            <tr class="work-row floor-1">
                <td>Enter Required Built-up Area (Ground Floor)</td>
                <td><input type="number" class="area-input" placeholder="Enter sqft"></td>
                <td>sqft</td>
                <td class="rate-cell">Rs.${packageRates[packageSelect.value]}</td>
                <td class="cost-cell">Rs.0</td>
            </tr>
        `;

        // ✅ Add additional floors based on selection
        for (let floor = 1; floor <= selectedFloors; floor++) {
            workRows += `
                <tr class="work-row floor-${floor + 1}">
                    <td>Enter Required Built-up Area (Floor ${floor})</td>
                    <td><input type="number" class="area-input" placeholder="Enter sqft"></td>
                    <td>sqft</td>
                    <td class="rate-cell">Rs.${packageRates[packageSelect.value]}</td>
                    <td class="cost-cell">Rs.0</td>
                </tr>
            `;
        }

        // ✅ Add common items (Water Sump, Septic Tank, Compound Wall)
        baseWorks.forEach(work => {
            workRows += `
                <tr class="work-row common-items">
                    <td>${work.name}</td>
                    <td>
                        ${work.isCompoundWall ? `
                            <input type="number" class="compound-length" placeholder="Length"> x 
                            <input type="number" class="compound-height" placeholder="Height">
                        ` : `
                            <input type="number" class="area-input" placeholder="Enter ${work.unit}">
                        `}
                    </td>
                    <td>${work.unit}</td>
                    <td class="rate-cell">Rs.${work.rate}</td>
                    <td class="cost-cell">Rs.0</td>
                </tr>
            `;
        });

        return workRows;
    }

    function updateTable() {
        tableBody.innerHTML = `
            <tr>
                <th>Work</th>
                <th>Area</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Cost</th>
            </tr>
            ${generateTableRows()}
        `;

        attachEventListeners();
        updateRates();
    }

    function updateRates() {
        const selectedPackage = packageSelect.value;
        const rate = packageRates[selectedPackage];

        document.querySelectorAll(".work-row").forEach(row => {
            const workName = row.cells[0].textContent.trim();
            const unitCell = row.cells[2].textContent;

            if (unitCell === "sqft" && !workName.includes("Compound Wall")) {
                row.cells[3].textContent = `Rs.${rate}`;
            } else if (workName.includes("Plain Compound Wall")) {
                row.cells[3].textContent = `Rs.425`;
            }
        });

        updateCosts();
    }

    function updateCosts() {
        let totalCost = 0;

        document.querySelectorAll(".work-row").forEach(row => {
            const areaInput = row.querySelector(".area-input");
            const rateCell = row.querySelector(".rate-cell");
            const costCell = row.querySelector(".cost-cell");

            if (areaInput && rateCell && costCell) {
                const area = parseFloat(areaInput.value) || 0;
                const rate = parseFloat(rateCell.textContent.replace("Rs.", "")) || 0;
                const cost = area * rate;
                costCell.textContent = `Rs.${cost}`;
                totalCost += cost;
            }
        });

        // ✅ Compound Wall Calculation
        document.querySelectorAll(".work-row").forEach(row => {
            if (row.cells[0].textContent.includes("Plain Compound Wall")) {
                const length = parseFloat(row.querySelector(".compound-length").value) || 0;
                const height = parseFloat(row.querySelector(".compound-height").value) || 0;
                const compoundCost = length * height * 425;
                row.querySelector(".cost-cell").textContent = `Rs.${compoundCost}`;
                totalCost += compoundCost;
            }
        });

        totalCostElement.textContent = `Rs. ${totalCost.toLocaleString()}`;
    }

    function attachEventListeners() {
        document.querySelectorAll(".area-input").forEach(input => {
            input.addEventListener("input", updateCosts);
        });
        document.querySelectorAll(".compound-length, .compound-height").forEach(input => {
            input.addEventListener("input", updateCosts);
        });
    }

    floorsSelect.addEventListener("change", updateTable);
    packageSelect.addEventListener("change", updateRates);

    updateTable(); // ✅ Initialize on page load
});
