import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  Globe,
  LogOut,
} from "lucide-react";

import { supabase } from "../../services/supabase";

export default function NavbarCRM() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <header
      className="
        fixed
        top-0
        left-[280px]
        right-0
        z-40

        h-[76px]

        bg-white
        border-b
        border-slate-200

        flex
        items-center
        justify-between

        px-6
        lg:px-8
      "
    >
      {/* =================================================
          LEFT
      ================================================= */}

      <div className="flex items-center gap-4 min-w-0">

        {/* MOBILE / SMALL BRAND */}

        <div className="lg:hidden flex items-center gap-2">
          <div
            className="
              w-9
              h-9
              rounded-lg
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
            "
          >
            <Globe size={19} />
          </div>
        </div>

        {/* PAGE CONTEXT */}

        <div className="min-w-0">
          <p
            className="
              text-sm
              font-bold
              text-slate-800
              truncate
            "
          >
            Travel Business Management
          </p>

          <p
            className="
              hidden
              md:block
              text-xs
              text-slate-400
              mt-0.5
            "
          >
            B2B Travel Management Platform
          </p>
        </div>
      </div>


      {/* =================================================
          CENTER SEARCH
      ================================================= */}

      <div
        className="
          hidden
          xl:flex
          flex-1
          justify-center
          px-8
        "
      >
        <div className="relative w-full max-w-[420px]">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search leads, customers, bookings..."
            className="
              w-full

              rounded-xl

              border
              border-slate-200

              bg-slate-50

              pl-11
              pr-4
              py-2.5

              text-sm
              text-slate-700

              placeholder:text-slate-400

              outline-none

              transition

              focus:bg-white
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>
      </div>


      {/* =================================================
          RIGHT
      ================================================= */}

      <div className="flex items-center gap-3">

        {/* DATE */}

        <div className="hidden 2xl:block text-right">

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.15em]
              text-slate-400
              font-bold
            "
          >
            Today
          </p>

          <p
            className="
              text-xs
              font-semibold
              text-slate-600
              mt-0.5
            "
          >
            {today}
          </p>

        </div>


        {/* DIVIDER */}

        <div
          className="
            hidden
            lg:block
            h-8
            w-px
            bg-slate-200
          "
        />


        {/* NOTIFICATIONS */}

        <button
          type="button"
          className="
            relative

            w-10
            h-10

            rounded-xl

            flex
            items-center
            justify-center

            text-slate-500

            hover:bg-slate-50
            hover:text-slate-800

            transition
          "
          title="Notifications"
        >
          <Bell size={19} />

          {/* notification dot */}

          <span
            className="
              absolute
              top-2
              right-2

              w-2
              h-2

              rounded-full

              bg-blue-600

              border-2
              border-white
            "
          />
        </button>


        {/* DIVIDER */}

        <div
          className="
            hidden
            lg:block
            h-8
            w-px
            bg-slate-200
          "
        />


        {/* =================================================
            ADMIN PROFILE
        ================================================= */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setProfileOpen(
                (previous) => !previous
              )
            }
            className="
              flex
              items-center
              gap-3

              rounded-xl

              px-2
              py-1.5

              hover:bg-slate-50

              transition
            "
          >

            {/* AVATAR */}

            <div
              className="
                w-10
                h-10

                rounded-xl

                bg-blue-600

                text-white

                flex
                items-center
                justify-center

                text-sm
                font-bold

                shadow-sm
              "
            >
              A
            </div>


            {/* USER INFO */}

            <div className="hidden md:block text-left">

              <p
                className="
                  text-sm
                  font-bold
                  text-slate-800
                  leading-tight
                "
              >
                Administrator
              </p>

              <p
                className="
                  text-[11px]
                  text-slate-400
                  mt-0.5
                "
              >
                Super Admin
              </p>

            </div>


            <ChevronDown
              size={16}
              className="
                hidden
                md:block
                text-slate-400
              "
            />
          </button>


          {/* =================================================
              PROFILE DROPDOWN
          ================================================= */}

          {profileOpen && (
            <div
              className="
                absolute
                right-0
                top-[52px]

                w-56

                bg-white

                border
                border-slate-200

                rounded-xl

                shadow-xl

                p-2

                z-50
              "
            >

              <div
                className="
                  px-3
                  py-3
                  border-b
                  border-slate-100
                  mb-1
                "
              >
                <p
                  className="
                    text-sm
                    font-bold
                    text-slate-800
                  "
                >
                  Administrator
                </p>

                <p
                  className="
                    text-xs
                    text-slate-400
                    mt-1
                  "
                >
                  WorldTrip Connect
                </p>
              </div>


              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="
                  w-full

                  flex
                  items-center
                  gap-3

                  px-3
                  py-2.5

                  rounded-lg

                  text-sm
                  font-semibold

                  text-red-600

                  hover:bg-red-50

                  transition
                "
              >
                <LogOut size={17} />

                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}