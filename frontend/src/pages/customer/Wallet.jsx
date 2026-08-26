import { useEffect, useState } from "react";
import {
  Wallet as WalletIcon,
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
  RefreshCw,
} from "lucide-react";

import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadWallet();
  }, []);

  async function loadWallet(isRefresh = false) {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Get wallet
      const { data: walletData, error: walletError } =
        await supabase
          .from("customer_wallets")
          .select("*")
          .eq("customer_id", user.id)
          .maybeSingle();

      if (walletError) throw walletError;

      setWallet(walletData);

      // Get transactions
      const { data: transactionData, error: transactionError } =
        await supabase
          .from("wallet_transactions")
          .select("*")
          .eq("customer_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      if (transactionError) throw transactionError;

      setTransactions(transactionData || []);
    } catch (error) {
      console.error("Wallet Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function formatAmount(amount) {
    return Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function isCredit(type) {
    return [
      "cashback",
      "refund",
      "adjustment",
    ].includes(type);
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading your wallet...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* HEADER */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Customer Wallet
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              My Wallet
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your cashback balance and wallet transactions.
            </p>
          </div>

          <button
            onClick={() => loadWallet(true)}
            disabled={refreshing}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-700
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

        </div>


        {/* WALLET BALANCE */}

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

          <div className="
            rounded-2xl
            bg-slate-900
            p-6
            text-white
            shadow-sm
          ">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-300">
                  Available Cashback
                </p>

                <h2 className="mt-2 text-3xl font-extrabold">
                  ₹{formatAmount(wallet?.available_balance)}
                </h2>
              </div>

              <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-white/10
              ">
                <WalletIcon size={24} />
              </div>

            </div>

            <p className="mt-5 text-xs text-slate-400">
              Available for your future bookings.
            </p>

          </div>


          <WalletCard
            title="Pending Cashback"
            amount={wallet?.pending_balance}
            icon={Gift}
            description="Waiting for tour completion"
          />

          <WalletCard
            title="Total Earned"
            amount={wallet?.total_earned}
            icon={ArrowDownLeft}
            description="Total cashback received"
          />

        </div>


        {/* TRANSACTIONS */}

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <h2 className="text-lg font-bold text-slate-900">
              Wallet History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your cashback and wallet transactions.
            </p>

          </div>


          {transactions.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <Gift
                size={40}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-bold text-slate-800">
                No transactions yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Cashback from completed tours will appear here.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {transactions.map((transaction) => {

                const credit = isCredit(
                  transaction.transaction_type
                );

                return (
                  <div
                    key={transaction.id}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      p-5
                      transition
                      hover:bg-slate-50
                    "
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          ${
                            credit
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          }
                        `}
                      >
                        {credit ? (
                          <ArrowDownLeft size={19} />
                        ) : (
                          <ArrowUpRight size={19} />
                        )}
                      </div>


                      <div>

                        <p className="text-sm font-bold text-slate-800">
                          {transaction.description ||
                            transaction.transaction_type}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(transaction.created_at)}
                        </p>

                      </div>

                    </div>


                    <p
                      className={`
                        text-sm
                        font-extrabold
                        ${
                          credit
                            ? "text-emerald-600"
                            : "text-red-600"
                        }
                      `}
                    >
                      {credit ? "+" : "-"}₹
                      {formatAmount(transaction.amount)}
                    </p>

                  </div>
                );
              })}

            </div>

          )}

        </div>

      </div>
    </Layout>
  );
}


/* ==========================================
   WALLET CARD
========================================== */

function WalletCard({
  title,
  amount,
  icon: Icon,
  description,
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
    ">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-extrabold text-slate-900">
            ₹
            {Number(amount || 0).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-600
        ">
          <Icon size={20} />
        </div>

      </div>

      <p className="mt-4 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}