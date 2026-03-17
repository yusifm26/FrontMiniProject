
function showTab(name) {
	const tabsHeader = document.querySelector('.tabs-header');
	if (!tabsHeader) return;

	document.querySelectorAll('.tab-btn').forEach((btn) => {
		btn.classList.remove('active');
	});

	document.querySelectorAll('.tab-content').forEach((content) => {
		content.classList.remove('active');
	});

	const target = document.getElementById(`tab-${name}`);
	if (target) target.classList.add('active');

	const clickedBtn = Array.from(tabsHeader.querySelectorAll('.tab-btn')).find((btn) => {
		return (btn.getAttribute('onclick') || '').includes(`showTab('${name}')`);
	});

	if (clickedBtn) clickedBtn.classList.add('active');
}

