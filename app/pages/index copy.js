import Layout from "../sections/Layout";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section  */}

      <main className="flex-grow container px-4 sm:px-6">
        <section className="flex flex-col space-y-10 mt-12 sm:mt-24 md:mt-32">
          {/* top isit !!!!!! Headlines */}
          <h2 className="text-3xl  text-gray-800 text-center leading-normal sm:text-6xl font-bold capitalize dark:text-gray-100 ">The Blogging Platform For Devs.</h2>
          <p className="text-xl sm:text-md text-center text-gray-500 dark:text-gray-200">Start your developer blog,share ideas and connect with the Dev Community.</p>
          {/* CTA */}
          <div className="flex   justify-start flex-row">
            <div className="flex  flex-col">
              <TestButton text="Home" />
              <TestButton text="Topics" />
              <TestButton text="Users" />
            </div>
            <div className="flex  flex-col">
              <TestPost name="aland" date="4 hours ago" className="flex flex-row" />
              <TestPost name="aland" date="4 hours ago" className="flex flex-row" />
            </div>
          </div>
          <Test  />
          <button className="btn" type="button" onClick={null}>
            {" "}
            Start Your Blog
          </button>
        </section>
      </main>
    </Layout>
  );
}

export const TestPost = ({ name, date, address, content, tags }) => {
  return (
    <div className=" m-1">
      <div className="flex justify-start   flex-col" >
        <div className="flex justify-start  items-center flex-row" >
          <span className=" text-2xl " >{name}</span> <span>&nbsp;•&nbsp;</span>
          <span className="text-1xl" >  {date}</span>
        </div>
      <p style={{marginTop:-7}} className=" text-sm text-gray-500 truncate w-44" >4216NRJydFjMVDd4Pv3Zjc5M3zSdb3yix6K4Akm6oXoL</p>
      </div>
      <p>iugiugugigggg9gt9gt9t9gtiugggggggggggg</p>
      <p>iugiugugigggg9gt9gt9t9gtiugggggggggggg</p>
      <p>iugiugugigggg9gt9gt9t9gtiugggggggggggg</p>
      <p>iugiugugigggg9gt9gt9t9gtiugggggggggggg</p>
      <span className="flex mt-3 text-violet-500">#test #ww11</span>
            <div className="flex  flex-row">
              <ActionButton text="Home" />
              <ActionButton text="Topics" />
              <ActionButton text="Topics" />
            </div>
    </div>
  )
}
export const ActionButton = ({ text }) => {
  return (
    <div className=" m-1">
      <button class="btn bg-transparent border-opacity-0 gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        {text}
      </button>
    </div>
  )
}
export const TestButton = ({ text }) => {

  return (
    <div className=" m-1">
      <button class="btn btn-lg bg-transparent border-opacity-0 gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        {text}
      </button>
    </div>
  )
}
export const Test = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-12">
          {/* <div className="p-12 md:w-1/2 flex flex-col items-start">
        <span className="inline-block py-1 px-2 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium tracking-widest">
          CATEGORY
        </span>
        <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">
          Roof party normcore before they sold out, cornhole vape
        </h2>
        <p className="leading-relaxed mb-8">
          Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal
          portland. VHS man braid palo santo hoodie brunch trust fund. Bitters
          hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's,
          slow-carb etsy tumeric. Cray pug you probably haven't heard of them
          hexagon kickstarter craft beer pork chic.
        </p>
        <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-800 border-opacity-75 mt-auto w-full">
          <a className="text-indigo-400 inline-flex items-center">
            Learn More
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
          <span className="text-gray-500 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
            <svg
              className="w-4 h-4 mr-1"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx={12} cy={12} r={3} />
            </svg>
            1.2K
          </span>
          <span className="text-gray-500 inline-flex items-center leading-none text-sm">
            <svg
              className="w-4 h-4 mr-1"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            6
          </span>
        </div>
        <a className="inline-flex items-center">
          <img
            alt="blog"
            src="https://dummyimage.com/104x104"
            className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
          />
          <span className="flex-grow flex flex-col pl-4">
            <span className="title-font font-medium text-white">
              Holden Caulfield
            </span>
            <span className="text-gray-500 text-xs tracking-widest mt-0.5">
              UI DEVELOPER
            </span>
          </span>
        </a>
      </div> */}

          {/* this is top */}
          {/* this is top */}
          {/* this is top */}
          {/* this is top */}


          <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-800 border-opacity-75 mt-auto w-full">
            <a className="text-indigo-400 inline-flex items-center">
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
            <span className="text-gray-500 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx={12} cy={12} r={3} />
              </svg>
              1.2K
            </span>
            <span className="text-gray-500 inline-flex items-center leading-none text-sm">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              6
            </span>
          </div>
          <a className="inline-flex items-center">
            <img
              alt="blog"
              src="https://dummyimage.com/103x103"
              className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
            />
            <span className="flex-grow flex flex-col pl-4">
              <span className="title-font font-medium text-white">
                Alper Kamu
              </span>
              <span className="text-gray-500 text-xs tracking-widest mt-0.5">
                DESIGNER
              </span>
            </span>
          </a>
          {/* this is top and bottom:: */}
          {/* this is top and bottom:: */}
          {/* this is top and bottom:: */}
          <div className="p-12 md:w-1/2 flex flex-col items-start">
            <span className="inline-block py-1 px-2 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium tracking-widest">
              CATEGORY
            </span>
            <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">
              Pinterest DIY dreamcatcher gentrify single-origin coffee
            </h2>
            <p className="leading-relaxed mb-8">
              Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal
              portland. VHS man braid palo santo hoodie brunch trust fund. Bitters
              hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's,
              slow-carb etsy tumeric.
            </p>

          </div>
        </div>
      </div>
    </section>

  )
}