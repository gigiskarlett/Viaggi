// toggles nav //

function showNav() {
    const mobileNav = document.getElementById("myLinks");
    if (mobileNav.style.display === "block") {
      mobileNav.style.display = "none";
    } else {
      mobileNav.style.display = "block";
    }
}