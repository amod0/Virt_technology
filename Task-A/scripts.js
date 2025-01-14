document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const cards = Array.from(document.querySelectorAll(".card"));
  const cardHeight = cards[0].offsetHeight; // Height of a single card
  let isGrabbing = false;
  let startY;
  let scrollStart;

  container.addEventListener("mousedown", (e) => {
    isGrabbing = true;
    startY = e.pageY;
    scrollStart = container.scrollTop;
    container.style.cursor = "grabbing";
  });

  container.addEventListener("mousemove", (e) => {
    if (!isGrabbing) return;
    e.preventDefault();

    const distance = startY - e.pageY;
    container.scrollTop = scrollStart + distance;
  });

  container.addEventListener("mouseup", () => {
    isGrabbing = false;
    container.style.cursor = "grab";
    snapToCard();
  });

  container.addEventListener("mouseleave", () => {
    isGrabbing = false;
    container.style.cursor = "grab";
    snapToCard();
  });

  // Scroll event to detect the centered card
  container.addEventListener("scroll", debounce(updateActiveCard, 50));

  function snapToCard() {
    const scrollPosition = container.scrollTop;
    const closestCardIndex = Math.round(scrollPosition / cardHeight); // Find the closest card index
    const targetScrollTop = closestCardIndex * cardHeight; // Calculate the scroll position to snap to the closest card

    container.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });

    updateActiveCard();
  }

  function updateActiveCard() {
    const containerMiddle = container.offsetHeight / 2;

    cards.forEach((card) => {
      const cardMiddle = card.getBoundingClientRect().top + cardHeight / 2;

      if (Math.abs(cardMiddle - containerMiddle) < cardHeight / 2) {
        card.classList.add("active"); // Add active class for the centered card
      } else {
        card.classList.remove("active");
      }
    });
  }

  // Utility: Debounce function to limit updateActiveCard execution frequency
  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  updateActiveCard();
});
