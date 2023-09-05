import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Store
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              At our store, we are passionate about sneakers and providing our customers with the best selection of high-quality footwear. Our collection of sneakers includes everything from classic designs to the newest releases from top brands. We carry a wide range of sizes to ensure that everyone can find the perfect pair of sneakers. Whether you're looking for sneakers to wear on the basketball court or stylish kicks to wear out on the town, we have something for everyone.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Tushar
                  </p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Hi, my name is Tushar. I am a 19 Year old. I taught myself Web Development and Python and I love to create projects using my skills. The few things I'm decent at are Coding, Cooking and Photography and I Live Stream events as a side gig. I also have a podcast that I host based on Tech.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Satvik
                  </p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  I am a second year student who is pursuing Bachelor of Computer Applications from Christ University Bangalore. I am always willing to have new experiences, meet new people and learn new things. I find the thought of producing value for individuals and changing the world through my work rewarding.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Arushi
                  </p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Hi I'm Arushi, I'm 20 years old, and right now I'm working on my computer applications bachelor's degree. With a decent understanding of technology, I enjoy resolving computer issues, and occasionally even those involving people. Working with computers and other digital technology is fun for me. Aside from computers, I'm also interested in Astrology.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;