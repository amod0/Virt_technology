document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const cards = Array.from(document.querySelectorAll(".card"));
  const cardHeight = cards[0].offsetHeight; // Height of a single card
  let isGrabbing = false;
  let startY;
  let scrollStart;

  // Mouse down event to start grabbing
  container.addEventListener("mousedown", (e) => {
    isGrabbing = true;
    startY = e.pageY;
    scrollStart = container.scrollTop;
    container.style.cursor = "grabbing";
  });

  // Mouse move event to handle dragging
  container.addEventListener("mousemove", (e) => {
    if (!isGrabbing) return;
    e.preventDefault();

    const distance = startY - e.pageY;
    container.scrollTop = scrollStart + distance;
  });

  // Mouse up event to snap to the closest card
  container.addEventListener("mouseup", () => {
    isGrabbing = false;
    container.style.cursor = "grab";
    snapToCard();
  });

  // Mouse leave event to stop grabbing
  container.addEventListener("mouseleave", () => {
    isGrabbing = false;
    container.style.cursor = "grab";
    snapToCard();
  });

  // Scroll event to detect the centered card
  container.addEventListener("scroll", debounce(updateActiveCard, 50));

  // Function to snap to the closest card
  function snapToCard() {
    const scrollPosition = container.scrollTop;
    const closestCardIndex = Math.round(scrollPosition / cardHeight); // Find the closest card index
    const targetScrollTop = closestCardIndex * cardHeight;

    container.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });

    updateActiveCard();
  }

  // Function to update the active (centered) card
  function updateActiveCard() {
    const containerMiddle = container.offsetHeight / 2;

    cards.forEach((card) => {
      const cardMiddle = card.getBoundingClientRect().top + cardHeight / 2;

      if (Math.abs(cardMiddle - containerMiddle) < cardHeight / 2) {
        card.classList.add("active"); // Add active class for the centered card
      } else {
        card.classList.remove("active"); // Remove active class for non-centered cards
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
