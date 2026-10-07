import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard.jsx";
import "./Doctor.css";
import defaultDoctorImage from "../../assets/Dr Sandeep Kumar.png";

import { API_URL } from '../../Config.js';

// Store only doctor information in localStorage.
// Do NOT store large images here.
const DOCTORS_CACHE_KEY = "mediyog_doctors_v6";

// Browser Cache API for doctor images.
const DOCTOR_IMAGE_CACHE = "mediyog-doctor-images-v1";

function Doctors({ onBookAppointment }) {
    const [doctors, setDoctors] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const visibleDoctors = 4;

    /*
     * ---------------------------------------------------------
     * CACHE DOCTOR IMAGE
     * ---------------------------------------------------------
     */
    const cacheDoctorImage = async (imageUrl) => {
        try {
            const cache = await caches.open(DOCTOR_IMAGE_CACHE);

            const existingImage = await cache.match(imageUrl);

            if (existingImage) {
                return;
            }

            const response = await fetch(imageUrl);

            if (!response.ok) {
                throw new Error(
                    `Image request failed: ${response.status}`
                );
            }

            await cache.put(imageUrl, response.clone());

            console.log("Doctor image cached:", imageUrl);
        } catch (error) {
            console.error(
                "Could not cache doctor image:",
                imageUrl,
                error
            );
        }
    };

    /*
     * ---------------------------------------------------------
     * GET DOCTOR IMAGE FROM BROWSER CACHE
     * ---------------------------------------------------------
     */
    const getCachedDoctorImage = async (imageUrl) => {
        try {
            const cache = await caches.open(DOCTOR_IMAGE_CACHE);

            const cachedResponse = await cache.match(imageUrl);

            if (!cachedResponse) {
                return null;
            }

            const blob = await cachedResponse.blob();

            return URL.createObjectURL(blob);
        } catch (error) {
            console.error(
                "Could not load cached doctor image:",
                error
            );

            return null;
        }
    };

    /*
     * ---------------------------------------------------------
     * LOAD DOCTORS FROM BROWSER CACHE
     * ---------------------------------------------------------
     */
    const loadDoctorsFromCache = async () => {
        try {
            const savedDoctors =
                localStorage.getItem(DOCTORS_CACHE_KEY);

            if (!savedDoctors) {
                console.warn("No cached doctors found.");
                setDoctors([]);
                return;
            }

            const parsedDoctors = JSON.parse(savedDoctors);

            if (
                !Array.isArray(parsedDoctors) ||
                parsedDoctors.length === 0
            ) {
                console.warn("Cached doctor data is empty.");
                setDoctors([]);
                return;
            }

            /*
             * Load each doctor's image separately from
             * the browser Cache API.
             */
            const doctorsWithOfflineImages = await Promise.all(
                parsedDoctors.map(async (doctor) => {
                    if (doctor.imageUrl) {
                        const cachedImage =
                            await getCachedDoctorImage(
                                doctor.imageUrl
                            );

                        return {
                            ...doctor,
                            image:
                                cachedImage ||
                                defaultDoctorImage,
                        };
                    }

                    return {
                        ...doctor,
                        image: defaultDoctorImage,
                    };
                })
            );

            setDoctors(doctorsWithOfflineImages);
            setCurrentIndex(0);

            console.log(
                "Doctors loaded from offline cache."
            );
        } catch (error) {
            console.error(
                "Could not read doctor cache:",
                error
            );

            setDoctors([]);
        }
    };

    /*
     * ---------------------------------------------------------
     * LOAD DOCTORS
     * ---------------------------------------------------------
     */
    useEffect(() => {
        let isMounted = true;

        const loadDoctors = async () => {
            try {
                /*
                 * Get doctor records from backend.
                 */
                const response = await fetch(
                    `${API_URL}/api/doctors`
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch doctors: ${response.status}`
                    );
                }

                const data = await response.json();

                console.log(
                    "Doctors received from backend:",
                    data
                );

                if (
                    !Array.isArray(data) ||
                    data.length === 0
                ) {
                    console.warn(
                        "Backend returned no doctors."
                    );

                    await loadDoctorsFromCache();
                    return;
                }

                /*
                 * Convert backend doctor data into
                 * frontend doctor data.
                 */
                const formattedDoctors = data.map(
                    (doctor) => {
                        const imageUrl = doctor.image
                            ? `${API_URL}${doctor.image}`
                            : null;

                        return {
                            id: doctor.id,

                            name: doctor.doctor_name,

                            specialization:
                                doctor.specialty,

                            experience:
                                doctor.experience,

                            operations:
                                doctor.operations,

                            /*
                             * Actual image used while
                             * backend is running.
                             */
                            image:
                                imageUrl ||
                                defaultDoctorImage,

                            /*
                             * Store the original image URL
                             * separately for offline use.
                             */
                            imageUrl: imageUrl,
                        };
                    }
                );

                /*
                 * Cache all doctor images.
                 *
                 * This does NOT put the images into
                 * localStorage.
                 */
                await Promise.all(
                    formattedDoctors.map(async (doctor) => {
                        if (doctor.imageUrl) {
                            await cacheDoctorImage(
                                doctor.imageUrl
                            );
                        }
                    })
                );

                /*
                 * Save ONLY small doctor information
                 * in localStorage.
                 */
                const doctorsForStorage =
                    formattedDoctors.map((doctor) => ({
                        id: doctor.id,
                        name: doctor.name,
                        specialization:
                            doctor.specialization,
                        experience:
                            doctor.experience,
                        operations:
                            doctor.operations,
                        imageUrl:
                            doctor.imageUrl,
                    }));

                localStorage.setItem(
                    DOCTORS_CACHE_KEY,
                    JSON.stringify(
                        doctorsForStorage
                    )
                );

                /*
                 * Show doctors using the real backend
                 * image URLs while backend is running.
                 */
                if (isMounted) {
                    setDoctors(formattedDoctors);
                    setCurrentIndex(0);
                }

                console.log(
                    "Doctors and images successfully cached."
                );
            } catch (error) {
                /*
                 * Backend is OFF or unavailable.
                 */
                console.error(
                    "Backend unavailable. Loading saved doctors...",
                    error
                );

                if (isMounted) {
                    await loadDoctorsFromCache();
                }
            }
        };

        loadDoctors();

        return () => {
            isMounted = false;
        };
    }, []);

    /*
     * ---------------------------------------------------------
     * NEXT DOCTORS
     * ---------------------------------------------------------
     */
    const nextDoctors = () => {
        setCurrentIndex((prevIndex) => {
            if (doctors.length <= visibleDoctors) {
                return 0;
            }

            if (
                prevIndex + visibleDoctors >=
                doctors.length
            ) {
                return 0;
            }

            return prevIndex + 1;
        });
    };

    /*
     * ---------------------------------------------------------
     * PREVIOUS DOCTORS
     * ---------------------------------------------------------
     */
    const previousDoctors = () => {
        setCurrentIndex((prevIndex) => {
            if (doctors.length <= visibleDoctors) {
                return 0;
            }

            if (prevIndex === 0) {
                return Math.max(
                    0,
                    doctors.length - visibleDoctors
                );
            }

            return prevIndex - 1;
        });
    };

    /*
     * ---------------------------------------------------------
     * DISPLAYED DOCTORS
     * ---------------------------------------------------------
     */
    const displayedDoctors = doctors.slice(
        currentIndex,
        currentIndex + visibleDoctors
    );

    /*
     * ---------------------------------------------------------
     * UI
     * ---------------------------------------------------------
     */
    return (
        <section
            className="doctors-section"
            id="doctors"
        >
            <div className="doctors-header">
                <p className="section-subtitle">
                    OUR SPECIALISTS
                </p>

                <h2>Meet Our Doctors</h2>

                <p className="section-description">
                    Our experienced medical professionals
                    are dedicated to providing the best
                    possible care to every patient.
                </p>
            </div>

            <div className="doctors-carousel">
                {doctors.length > visibleDoctors && (
                    <button
                        className="carousel-btn previous-btn"
                        onClick={previousDoctors}
                        aria-label="Previous doctors"
                    >
                        &#10094;
                    </button>
                )}

                <div className="doctors-container">
                    {displayedDoctors.length > 0 ? (
                        displayedDoctors.map((doctor) => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                onBookAppointment={
                                    onBookAppointment
                                }
                            />
                        ))
                    ) : (
                        <div className="no-doctors-message">
                            <p>
                                No doctors available at
                                the moment.
                            </p>
                        </div>
                    )}
                </div>

                {doctors.length > visibleDoctors && (
                    <button
                        className="carousel-btn next-btn"
                        onClick={nextDoctors}
                        aria-label="Next doctors"
                    >
                        &#10095;
                    </button>
                )}
            </div>
        </section>
    );
}

export default Doctors;