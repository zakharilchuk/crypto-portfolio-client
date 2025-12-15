import { useState } from "react";
import Modal from "react-modal";
import dayjs from "dayjs";
import Select from "react-select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import type { Coin } from "../../types/coin";
import { TokenIcon } from "@web3icons/react/dynamic";

interface NewTransaction {
  coinId: number | null;
  amount: string;
  price: string;
  type: "buy" | "sell";
  date: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  coins: Coin[];
  portfolioId: number;
  onCreateTransaction: (payload: {
    coinId: number;
    amount: number;
    price: number;
    date: string;
  }) => void;
}

const CreateTransactionModal = ({
  isOpen,
  onClose,
  coins,
  portfolioId,
  onCreateTransaction,
}: Props) => {
  const coinOptions = coins.map((coin) => ({
    value: coin.id,
    label: coin.name,
  }));

  const [transaction, setTransaction] = useState<NewTransaction>({
    coinId: null,
    amount: "0",
    price: "0",
    type: "buy",
    date: dayjs().toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction.coinId) return;
    onCreateTransaction({
      coinId: transaction.coinId!,
      amount: Number(transaction.amount),
      price: Number(transaction.price),
      date: dayjs(transaction.date).toISOString(),
    });
    onClose();
    setTransaction({
      coinId: null,
      amount: "0",
      price: "0",
      type: "buy",
      date: dayjs().toString(),
    });
  };

  const handleClose = () => {
    onClose();
    setTransaction({
      coinId: null,
      amount: "0",
      price: "0",
      type: "buy",
      date: dayjs().toString(),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="absolute top-1/2 left-1/2 bg-white border border-gray-300 p-4 outline-none transform -translate-x-1/2 -translate-y-1/2 w-lg"
    >
      <h2 className="text-lg mb-2">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-4">
          <button
            type="button"
            className={transaction.type === "buy" ? "" : "text-gray-400"}
            onClick={() => setTransaction({ ...transaction, type: "buy" })}
          >
            Buy
          </button>
          <button
            type="button"
            className={transaction.type === "sell" ? "" : "text-gray-400"}
            onClick={() => setTransaction({ ...transaction, type: "sell" })}
          >
            Sell
          </button>
        </div>

        <label>Coin:</label>
        <Select
          options={coinOptions}
          value={coinOptions.find(
            (option) => option.value === transaction.coinId
          )}
          onChange={(selected) =>
            setTransaction({ ...transaction, coinId: selected?.value || 0 })
          }
          placeholder="Select a coin..."
          formatOptionLabel={({ value, label }) => {
            const coin = coins.find((c) => c.id === value);
            return (
              <div className="flex items-center gap-2">
                {coin && (
                  <TokenIcon
                    symbol={coin.symbol}
                    size={24}
                    variant="background"
                  />
                )}
                <span>{label}</span>
              </div>
            );
          }}
          isSearchable
          styles={{
            control: (provided) => ({
              ...provided,
              border: "1px solid #f2f2f2",
              borderRadius: "0",
              boxShadow: "none",
              "&:hover": { outline: "none" },
            }),
            menu: (provided) => ({
              ...provided,
              color: "black",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#f0f0f0" : "white",
              color: "black",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }),
          }}
        />

        <label>Amount:</label>
        <input
          id="amount"
          type="number"
          step="any"
          className="border border-[#f2f2f2] px-3 py-2 focus:outline-none w-full"
          value={transaction.amount}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
              setTransaction({ ...transaction, amount: value });
            }
          }}
        />

        <label htmlFor="price">Price:</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>

          <input
            id="price"
            type="number"
            step="any"
            className="border border-[#f2f2f2] pl-7 pr-3 py-2 focus:outline-none w-full"
            value={transaction.price}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setTransaction({ ...transaction, price: value });
              }
            }}
          />
        </div>

        <label>Date:</label>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            minDate={dayjs("2010-01-01")}
            maxDate={dayjs()}
            value={dayjs(transaction.date)}
            onChange={(newValue) =>
              setTransaction({
                ...transaction,
                date: newValue?.toString() || dayjs().toString(),
              })
            }
            format="MMM DD, YYYY"
          />
        </DemoContainer>

        <p>
          Total: $
          {(Number(transaction.amount) * Number(transaction.price)).toFixed(2)}
        </p>

        <div className="flex gap-4 mt-2">
          <button type="submit" className="hover:text-gray-600">
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-red-600"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTransactionModal;
