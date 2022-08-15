import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Link } from "react-router-dom";

function TrendSwiper({ trends }) {
  console.log(trends);
  const { width, height } = useWindowDimensions();
  let slidesNumber = 7;

  if (width < 1100 && width > 768) {
    slidesNumber = 4;
  } else if (width < 768) {
    slidesNumber = 2;
  }

  console.log(slidesNumber, width);
  return (
    <div className="   pb-4">
      <h3 className="text-white text-lg">Trending</h3>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        //   rewind={true}
        loop={true}
        //   loopFillGroupWithBlank={true}
        //   slidesPerGroup={7}
        spaceBetween={30}
        slidesPerView={slidesNumber}
        navigation
        //   pagination={{ clickable: true }}
      >
        {trends.map((trend) => (
          <SwiperSlide key={trend.id} className="">
            <Link to={`/${trend.id}`}>
              <div className="max-w-md h-full ">
                <br />
                <img
                  src={`https://image.tmdb.org/t/p/original/${trend.poster_path}`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TrendSwiper;
