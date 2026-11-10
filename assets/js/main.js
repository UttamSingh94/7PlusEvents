/**
 * 7 PLUS EVENTS - MAIN PRODUCTION JAVASCRIPT
 * Location: Udaipur, Rajasthan, India
 * 
 * Dependencies: assets/js/business-config.js (loaded prior)
 * Features:
 *  - Centralized Business Contact Management & Verification Guard
 *  - Mobile Navigation & Smooth Scrolling
 *  - Service Category Tab Filtering
 *  - Gallery Lightbox Modal
 *  - Form Validation & WhatsApp Enquiry Generator
 *  - iOS Safari & Touch Compatibility
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Business Config & Verification Guard
  // =========================================================================
  const config = (typeof BUSINESS !== 'undefined') ? BUSINESS : {
    name: "7 Plus Events",
    location: "Udaipur, Rajasthan, India",
    googleMaps: "https://maps.app.goo.gl/unFHhDAecw6rCvzb9",
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    facebook: ""
  };

  // Helper: Format WhatsApp URL
  function getWhatsAppUrl(message) {
    if (!config.whatsapp || config.whatsapp.trim() === '') {
      return null;
    }
    let cleanNumber = config.whatsapp.replace(/[^0-9]/g, '');
    cleanNumber = cleanNumber.replace(/^0+/, ''); // Remove leading 0 if provided (e.g. 07976967467)
    const fullNumber = cleanNumber.startsWith('91') ? cleanNumber : '91' + cleanNumber;
    return `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;
  }

  // Populate dynamic text elements
  document.querySelectorAll('[data-business="name"]').forEach(el => el.textContent = config.name);
  document.querySelectorAll('[data-business="location"]').forEach(el => el.textContent = config.location);
  document.querySelectorAll('[data-business="address"]').forEach(el => el.textContent = config.address || config.location);
  document.querySelectorAll('[data-business="phone"]').forEach(el => el.textContent = config.phone);

  // Wire all Google Maps links strictly to official URL
  document.querySelectorAll('a[href*="maps.app.goo.gl"], [data-business-link="googleMaps"]').forEach(link => {
    link.href = config.googleMaps;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // Handle Phone Call Elements
  const phoneLinks = document.querySelectorAll('a[href^="tel:"], [data-phone-action]');
  phoneLinks.forEach(link => {
    if (config.phone && config.phone.trim() !== '') {
      let cleanPhone = config.phone.replace(/[^0-9+]/g, '');
      if (cleanPhone.startsWith('0')) {
        cleanPhone = '+91' + cleanPhone.replace(/^0+/, '');
      } else if (!cleanPhone.startsWith('+')) {
        cleanPhone = cleanPhone.startsWith('91') ? '+' + cleanPhone : '+91' + cleanPhone;
      }
      link.href = `tel:${cleanPhone}`;
      link.removeAttribute('data-unverified');
      if (link.hasAttribute('data-phone-text')) {
        link.textContent = config.phone;
      }
    } else {
      link.setAttribute('data-unverified', 'true');
      link.removeAttribute('href');
      link.style.cursor = 'pointer';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showNoticeModal({
          title: "Phone Number Awaiting Confirmation",
          badge: "Business Verification Pending",
          message: "The official telephone line for <strong>7 Plus Events</strong> is currently awaiting confirmation from the business owner for this live demo.<br><br>You can explore the complete decoration catalog or locate the business via Google Maps below.",
          showMapsButton: true
        });
      });
    }
  });

  // Wire WhatsApp action buttons
  document.querySelectorAll('[data-whatsapp-message]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rawMsg = btn.getAttribute('data-whatsapp-message') || "Hello 7 Plus Events, I am interested in your event decoration services in Udaipur.";
      const url = getWhatsAppUrl(rawMsg);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        e.preventDefault();
        showNoticeModal({
          title: "WhatsApp Booking Line",
          badge: "Awaiting Business Number",
          message: "WhatsApp is the primary booking channel for <strong>7 Plus Events</strong>. The business owner has not yet configured their live WhatsApp number for this demo.<br><br>Here is a preview of the automated enquiry message that will be dispatched:",
          previewText: rawMsg,
          showCopyButton: true
        });
      }
    });
  });

  // =========================================================================
  // 2. Mobile Menu & Sticky Header Navigation
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const menuIcon = document.getElementById('menuIcon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mainHeader = document.querySelector('header');

  function openMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('hidden');
    if (menuIcon) menuIcon.textContent = 'close';
    document.body.style.overflow = 'hidden'; // Lock background scroll
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('hidden');
    if (menuIcon) menuIcon.textContent = 'menu';
    document.body.style.overflow = ''; // Restore scroll
    document.body.classList.remove('menu-open');
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileDrawer.classList.contains('hidden');
      if (isHidden) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });

    // Close when clicking any navigation link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on backdrop click
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMobileMenu();
      }
    });
  }

  // Sticky Header elevation on scroll
  window.addEventListener('scroll', () => {
    if (!mainHeader) return;
    if (window.scrollY > 20) {
      mainHeader.classList.add('shadow-md', 'bg-surface-bright/95');
    } else {
      mainHeader.classList.remove('shadow-md');
    }
  }, { passive: true });

  // =========================================================================
  // 3. Service Category Filter
  // =========================================================================
  const filterButtons = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('gold-gradient-bg', 'text-on-primary', 'shadow-sm');
        b.classList.add('bg-surface', 'border', 'border-outline-variant/40', 'text-on-surface-variant');
      });

      btn.classList.add('gold-gradient-bg', 'text-on-primary', 'shadow-sm');
      btn.classList.remove('bg-surface', 'border', 'border-outline-variant/40', 'text-on-surface-variant');

      const category = btn.getAttribute('data-category');
      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // "View Designs" buttons on service cards navigate smoothly to Gallery
  document.querySelectorAll('.view-designs-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCategory = btn.getAttribute('data-filter') || 'all';
      const designsSection = document.getElementById('designs');
      if (designsSection) {
        designsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 4. Image Lightbox Modal
  // =========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightbox = document.getElementById('closeLightbox');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(src, altText) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = altText || '7 Plus Events Decoration Udaipur';
    if (lightboxCaption) {
      lightboxCaption.textContent = altText || '7 Plus Events — Udaipur Bespoke Decoration';
    }
    lightboxModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  }

  function closeLightboxModal() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        const alt = img.getAttribute('alt') || img.getAttribute('data-alt') || 'Event Decoration Preview';
        openLightbox(img.src, alt);
      }
    });
  });

  if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxModal);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightboxModal();
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightboxModal();
      closeNoticeModal();
      closeMobileMenu();
    }
  });

  // =========================================================================
  // 5. WhatsApp Enquiry Form Validation & Submission
  // =========================================================================
  const enquiryForm = document.getElementById('enquiryForm');

  if (enquiryForm) {
    // Set minimum date to today
    const dateInput = document.getElementById('eventDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('fullName');
      const phoneEl = document.getElementById('phoneNumber');
      const eventTypeEl = document.getElementById('eventType');
      const eventDateEl = document.getElementById('eventDate');
      const locationEl = document.getElementById('eventLocation');
      const notesEl = document.getElementById('eventNotes');

      let isValid = true;

      // Helper: validation highlight
      function validateInput(el, condition, errorMsg) {
        const parent = el.parentElement;
        let errEl = parent.querySelector('.form-feedback-error');
        if (!condition) {
          isValid = false;
          el.classList.add('is-invalid');
          el.classList.remove('is-valid');
          if (!errEl) {
            errEl = document.createElement('span');
            errEl.className = 'form-feedback-error';
            parent.appendChild(errEl);
          }
          errEl.textContent = errorMsg;
        } else {
          el.classList.remove('is-invalid');
          el.classList.add('is-valid');
          if (errEl) errEl.remove();
        }
      }

      // 1. Validate Name (min 2 characters)
      const nameVal = nameEl ? nameEl.value.trim() : '';
      validateInput(nameEl, nameVal.length >= 2, 'Please enter your full name (at least 2 letters).');

      // 2. Validate Phone (Indian 10-digit number format)
      const phoneVal = phoneEl ? phoneEl.value.trim().replace(/[\s-]/g, '') : '';
      const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
      validateInput(phoneEl, phoneRegex.test(phoneVal), 'Please enter a valid 10-digit Indian mobile number.');

      // 3. Validate Event Type
      const eventVal = eventTypeEl ? eventTypeEl.value : '';
      validateInput(eventTypeEl, eventVal !== '' && eventVal !== 'Select Service', 'Please choose an event service.');

      // 4. Validate Event Date
      const dateVal = eventDateEl ? eventDateEl.value : '';
      validateInput(eventDateEl, dateVal !== '', 'Please select your celebration date.');

      // 5. Validate Location in Udaipur
      const locVal = locationEl ? locationEl.value.trim() : '';
      validateInput(locationEl, locVal.length >= 2, 'Please specify the celebration area or venue in Udaipur.');

      if (!isValid) {
        // Focus first invalid input
        const firstInvalid = enquiryForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const notesVal = notesEl ? notesEl.value.trim() : '';

      // Construct Professional WhatsApp Enquiry Message
      const message = 
`*New Event Decoration Enquiry - 7 Plus Events Udaipur*
---------------------------------------
*Customer Name:* ${nameVal}
*Mobile Number:* ${phoneVal}
*Occasion / Service:* ${eventVal}
*Celebration Date:* ${dateVal}
*Venue / Area:* ${locVal}
*Specific Preferences:* ${notesVal ? notesVal : 'Standard theme as per design catalog'}
---------------------------------------
Please share available decoration designs and package pricing.
Thank you!`;

      const whatsappUrl = getWhatsAppUrl(message);

      if (whatsappUrl) {
        // Direct WhatsApp dispatch when verified number is present
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Show interactive preview modal for unverified state
        showNoticeModal({
          title: "Enquiry Form Validated!",
          badge: "Ready For WhatsApp Dispatch",
          message: `Great! Your enquiry details have been validated. Because the verified WhatsApp number for <strong>${config.name}</strong> is currently pending configuration by the business owner, here is your generated message:`,
          previewText: message,
          showCopyButton: true,
          showMapsButton: true
        });
      }
    });

    // Clear validation error on input
    enquiryForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
          const errEl = input.parentElement.querySelector('.form-feedback-error');
          if (errEl) errEl.remove();
        }
      });
    });
  }

  // =========================================================================
  // 6. Interactive Notice & Preview Modal
  // =========================================================================
  const noticeModal = document.getElementById('businessNoticeModal');
  const noticeTitle = document.getElementById('noticeModalTitle');
  const noticeBadge = document.getElementById('noticeModalBadge');
  const noticeMessage = document.getElementById('noticeModalMessage');
  const noticePreviewBox = document.getElementById('noticeModalPreview');
  const noticePreviewText = document.getElementById('noticeModalPreviewText');
  const noticeCopyBtn = document.getElementById('noticeCopyBtn');
  const noticeMapsBtn = document.getElementById('noticeMapsBtn');
  const closeNoticeBtn = document.getElementById('closeNoticeModal');

  function showNoticeModal(options) {
    if (!noticeModal) return;
    if (noticeTitle) noticeTitle.textContent = options.title || "7 Plus Events";
    if (noticeBadge) noticeBadge.textContent = options.badge || "Notice";
    if (noticeMessage) noticeMessage.innerHTML = options.message || "";

    if (options.previewText && noticePreviewBox && noticePreviewText) {
      noticePreviewBox.classList.remove('hidden');
      noticePreviewText.textContent = options.previewText;
      if (noticeCopyBtn) {
        noticeCopyBtn.onclick = () => {
          navigator.clipboard.writeText(options.previewText).then(() => {
            const orig = noticeCopyBtn.textContent;
            noticeCopyBtn.textContent = "Copied to Clipboard!";
            setTimeout(() => { noticeCopyBtn.textContent = orig; }, 2000);
          });
        };
      }
    } else if (noticePreviewBox) {
      noticePreviewBox.classList.add('hidden');
    }

    if (noticeMapsBtn) {
      if (options.showMapsButton) {
        noticeMapsBtn.classList.remove('hidden');
        noticeMapsBtn.href = config.googleMaps;
      } else {
        noticeMapsBtn.classList.add('hidden');
      }
    }

    noticeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  }

  function closeNoticeModal() {
    if (!noticeModal) return;
    noticeModal.classList.remove('active');
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
  }

  if (closeNoticeBtn) {
    closeNoticeBtn.addEventListener('click', closeNoticeModal);
  }

  if (noticeModal) {
    noticeModal.addEventListener('click', (e) => {
      if (e.target === noticeModal) {
        closeNoticeModal();
      }
    });
  }

  // =========================================================================
  // 7. Active Navigation Link Highlighting on Scroll
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length > 0 && desktopNavLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          desktopNavLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('text-primary', 'font-semibold', 'border-b-2', 'border-primary', 'pb-0.5');
              link.classList.remove('text-on-surface-variant');
            } else {
              link.classList.remove('text-primary', 'font-semibold', 'border-b-2', 'border-primary', 'pb-0.5');
              link.classList.add('text-on-surface-variant');
            }
          });
        }
      });
    }, observerOptions);

    // Set initial active state based on hash or default #home
    const initialHash = window.location.hash || '#home';
    desktopNavLinks.forEach(link => {
      if (link.getAttribute('href') === initialHash) {
        link.classList.add('text-primary', 'font-semibold', 'border-b-2', 'border-primary', 'pb-0.5');
        link.classList.remove('text-on-surface-variant');
      } else {
        link.classList.remove('text-primary', 'font-semibold', 'border-b-2', 'border-primary', 'pb-0.5');
        link.classList.add('text-on-surface-variant');
      }
    });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

});
