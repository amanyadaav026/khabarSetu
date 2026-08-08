import React from "react";
import {
  Newspaper,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  PenLine,
  TrendingUp,
  Upload,
  CheckCircle,
  BookOpen,
} from "lucide-react";


const About = () => {


  const features = [
    {
      icon: <ShieldCheck size={30} />,
      title: "Reliable Information",
      description:
        "Providing meaningful stories with focus on accuracy and trust.",
    },
    {
      icon: <Users size={30} />,
      title: "Community Driven",
      description:
        "Giving people a platform to share stories that matter.",
    },
    {
      icon: <Globe size={30} />,
      title: "Local Voices",
      description:
        "Connecting local communities with wider audiences.",
    },
    {
      icon: <Zap size={30} />,
      title: "Fast Updates",
      description:
        "Stay updated with important events and trending news.",
    },
  ];


  const workflow = [
    {
      icon: <Upload />,
      title: "Create Story",
      description:
        "Users can share news and important stories.",
    },
    {
      icon: <CheckCircle />,
      title: "Verification",
      description:
        "Articles go through quality checks before publishing.",
    },
    {
      icon: <BookOpen />,
      title: "Publish",
      description:
        "Approved stories become available for readers.",
    },
  ];



  return (

    <div className="min-h-screen bg-slate-50">


      {/* Hero Section */}

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">


        <div className="
        max-w-5xl
        mx-auto
        text-center
        ">


          <div className="
          inline-flex
          items-center
          justify-center
          h-16
          w-16
          rounded-2xl
         bg-red-50
          mb-6
          sm:h-20
          sm:w-20
          sm:rounded-3xl
          sm:mb-8
          ">

            <Newspaper
              size={36}
              className="text-red-600 sm:size-11.25"
            />

          </div>



          <h1 className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          font-extrabold
          tracking-tight
          text-slate-900
          ">

            About{" "}

            <span>
              Khabar
            </span>

            <span className="text-red-600">
              Setu
            </span>

          </h1>



          <p className="
          mt-5
          max-w-3xl
          mx-auto
          text-base
         text-slate-600
          leading-7
          sm:mt-6
          sm:text-lg
          sm:leading-relaxed
          ">

            A community-driven news platform connecting
            people with authentic stories, local updates
            and meaningful information.

          </p>



          <div className="
          mt-8
          flex
          flex-wrap
          justify-center
          gap-3
          sm:mt-10
          sm:gap-4
          ">


            <span className="
            px-4
            py-2.5
            rounded-full
           bg-slate-900
            text-sm
           text-white
            font-medium
            sm:px-6
            sm:py-3
            sm:text-base
            ">

              Trusted Stories

            </span>



            <span className="
            px-4
            py-2.5
            rounded-full
            border
           border-red-600
            text-sm
           text-red-600
            font-medium
            sm:px-6
            sm:py-3
            sm:text-base
            ">

              Community Powered

            </span>


          </div>


        </div>


      </section>





      {/* Mission */}


      <section className="py-20 px-6">


        <div className="
          max-w-6xl
          mx-auto
          grid
          gap-5
          sm:gap-6
          md:grid-cols-2
          md:gap-8
        ">



          <div className="
          bg-white
          rounded-2xl
          p-6
          border
          shadow-sm
          sm:rounded-3xl
          sm:p-8
          ">


            <h2 className="
            text-2xl
            font-bold
           text-slate-900
            sm:text-3xl
            ">

              Our Mission

            </h2>


            <p className="
            mt-4
            text-sm
            leading-7
           text-slate-600
            sm:mt-5
            sm:text-base
            sm:leading-relaxed
            ">

              Our mission is to build a bridge between
              people and information. KhabarSetu allows
              users to share stories while helping readers
              discover important news.

            </p>


          </div>




          <div className="
          rounded-xl
          p-6
          bg-slate-900
          text-white
          sm:rounded-3xl
          sm:p-8
          ">


            <PenLine
              size={34}
              className="mb-4 text-red-600 sm:mb-5 sm:size-10"
            />


            <h3 className="
            text-xl
            font-bold
            sm:text-2xl
            ">

              Everyone Has A Story

            </h3>


            <p className="
            mt-3
            text-sm
            leading-6
            text-slate-300
            sm:mt-4
            sm:text-base
            sm:leading-relaxed
            ">

              KhabarSetu gives individuals a voice to
              share stories that deserve attention.

            </p>


          </div>



        </div>


      </section>





      {/* Stats */}


      <section className="px-4 pb-14 sm:px-6 sm:pb-20">


        <div className="
        max-w-5xl
        mx-auto
        grid
        grid-cols-2
        gap-3
        sm:gap-5
        md:grid-cols-4
        ">


          {
            [
              ["100%", "Community Focus"],
              ["24/7", "News Updates"],
              ["∞", "Stories"],
              ["1", "Trusted Platform"],
            ].map((item,index)=>(


              <div
              key={index}
              className="
              bg-white
              border
              rounded-xl
              p-4
              text-center
              shadow-sm
              sm:rounded-2xl
              sm:p-6
              "
              >


                <h3 className="
                text-2xl
                font-bold
                text-red-600
                sm:text-3xl
                ">

                  {item[0]}

                </h3>


                <p className="
                mt-2
                text-xs
                leading-5
                text-slate-600
                sm:text-sm
                ">

                  {item[1]}

                </p>


              </div>


            ))
          }


        </div>


      </section>






      {/* Features */}


      <section className="
      bg-white
      px-4
      py-14
      sm:px-6
      sm:py-20
      ">


        <h2 className="
        text-center
        text-2xl
        font-bold
        text-slate-900
        sm:text-3xl
        ">

          Why KhabarSetu?

        </h2>



        <div className="
        max-w-6xl
        mx-auto
        mt-8
        grid
        gap-4
        sm:mt-12
        sm:gap-6
        md:grid-cols-4
        ">


          {
            features.map((item,index)=>(


              <div
              key={index}
              className="
              bg-slate-50
              rounded-2xl
              p-5
              border
              hover:-translate-y-1
              hover:shadow-xl
              transition-all
              duration-300
              sm:rounded-3xl
              sm:p-6
              "
              >


                <div className="
                text-red-600
                mb-4
                sm:mb-5
                ">

                  {item.icon}

                </div>


                <h3 className="
                text-lg
                font-bold
                sm:text-xl
                ">

                  {item.title}

                </h3>


                <p className="
                mt-3
                text-sm
                leading-6
                text-slate-600
                sm:text-base
                sm:leading-relaxed
                ">

                  {item.description}

                </p>


              </div>


            ))
          }


        </div>


      </section>







      {/* How It Works */}


      <section className="px-4 py-14 sm:px-6 sm:py-20">


        <h2 className="
        text-center
        text-2xl
        font-bold
        sm:text-3xl
        ">

          How KhabarSetu Works

        </h2>



        <div className="
        max-w-5xl
        mx-auto
        mt-8
        grid
        gap-5
        sm:mt-12
        sm:gap-8
        md:grid-cols-3
        ">



          {
            workflow.map((step,index)=>(


              <div
              key={index}
              className="
              bg-white
              rounded-2xl
              p-6
              border
              text-center
              sm:rounded-3xl
              sm:p-7
              "
              >


                <div className="
                mx-auto
                flex
                items-center
                justify-center
                h-12
                w-12
                rounded-full
                bg-red-50
                text-red-600
                sm:h-14
                sm:w-14
                ">

                  {step.icon}

                </div>



                <h3 className="
                mt-4
                font-bold
                text-lg
                sm:mt-5
                sm:text-xl
                ">

                  {step.title}

                </h3>


                <p className="
                  mt-3
                  text-sm
                  leading-6
                 text-slate-600
                  sm:text-base
                  sm:leading-relaxed
                ">

                  {step.description}

                </p>


              </div>


            ))
          }


        </div>


      </section>






      {/* Vision */}


      <section className="  
      px-4
      py-14
      text-center
      bg-white
      sm:px-6
      sm:py-20
      ">


        <TrendingUp
        size={36}
        className="
        mx-auto
        text-red-600
        sm:size-11.25
        "
        />


        <h2 className="
        mt-5
        text-2xl
        font-bold
        sm:mt-6
        sm:text-3xl
        ">

          Building The Future Of News

        </h2>



        <p className="
        max-w-3xl
        mx-auto
        mt-4
        text-sm
        leading-6
        text-slate-600
        sm:mt-5
        sm:text-base
        sm:leading-relaxed
        ">

          Our vision is to create India's trusted
          community-based news ecosystem where
          information is accessible, transparent and
          meaningful.

        </p>


      </section>







      {/* CTA */}


      <section className="
      bg-slate-900
      rounded-t-[2rem]
      text-white
      px-4
      py-14
      text-center
      sm:rounded-t-[3rem]
      sm:px-6
      sm:py-20
      ">


        <h2 className="
        text-3xl
        font-bold
        sm:text-4xl
        ">

          Join Khabar
          <span className="text-red-600">
            Setu
          </span>

        </h2>


        <p className="         
          mx-auto
          mt-3
          max-w-md
          text-sm
          leading-6
          text-slate-300
          sm:mt-4
          sm:text-base
          sm:leading-relaxed
        ">

          Share stories. Connect people. Make an impact.

        </p>


      </section>



    </div>

  );
};


export default About;