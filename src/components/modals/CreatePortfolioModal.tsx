import { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreatePortfolio: (payload: { name: string; type: string }) => void;
}

interface NewPortfolio {
  name: string;
  type: "manual" | "exchange" | "wallet";
  exchange?: "binance" | "bybit";
}

function CreatePortfolioModal({ isOpen, onClose, onCreatePortfolio }: Props) {
  const [newPortfolio, setNewPortfolio] = useState<NewPortfolio>({
    name: "",
    type: "manual",
  });
  const [showExchangeFields, setShowExchangeFields] = useState(false);

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePortfolio({
      name: newPortfolio.name,
      type: newPortfolio.type,
    });
    onClose();
    setShowExchangeFields(false);
  };

  const handleClose = () => {
    onClose();
    setNewPortfolio({
      name: "",
      type: "manual",
      exchange: undefined,
    });
    setShowExchangeFields(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Portfolio Modal"
      className="absolute top-1/2 left-1/2 bg-white border border-gray-300 p-4 outline-none transform -translate-x-1/2 -translate-y-1/2 w-md"
    >
      <h2 className="text-xl mb-4">add new portfolio</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Portfolio Name:</label>
          <input
            type="text"
            className="border border-[#f2f2f2] px-3 py-2 focus:outline-none w-full"
            placeholder="Enter portfolio name"
            value={newPortfolio.name}
            onChange={(e) =>
              setNewPortfolio({ ...newPortfolio, name: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Portfolio Type:</label>
          <Select
            name="portfolioType"
            options={[
              { value: "manual", label: "manual" },
              { value: "exchange", label: "exchange" },
              { value: "wallet", label: "wallet" },
            ]}
            id="portfolioType"
            value={
              newPortfolio.type
                ? { value: newPortfolio.type, label: newPortfolio.type }
                : null
            }
            onChange={(selectedOption) => {
              const value = selectedOption?.value as
                | "manual"
                | "exchange"
                | "wallet";
              setNewPortfolio({ ...newPortfolio, type: value });

              if (value === "exchange") {
                setShowExchangeFields(true);
              } else {
                setShowExchangeFields(false);
              }
            }}
            isSearchable={false}
            placeholder="Select portfolio type"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "1px solid #f2f2f2",
                borderRadius: "0",
                boxShadow: "none",
                "&:hover": { outline: "none" },
                padding: "3px",
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
          {showExchangeFields && (
            <div className="mt-4 flex flex-col gap-2">
              <label className="block mb">
                Exchange (USE READ-ONLY API KEYS):
              </label>
              <Select
                options={[
                  { value: "binance", label: "Binance" },
                  { value: "bybit", label: "Bybit" },
                ]}
                id="exchange"
                value={
                  newPortfolio.exchange
                    ? {
                        value: newPortfolio.exchange,
                        label:
                          newPortfolio.exchange === "binance"
                            ? "Binance"
                            : "Bybit",
                      }
                    : null
                }
                onChange={(
                  selectedOption: { value: string; label: string } | null
                ) => {
                  const value = selectedOption?.value as "binance" | "bybit";
                  setNewPortfolio({ ...newPortfolio, exchange: value });
                }}
                placeholder="Select exchange"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "1px solid #f2f2f2",
                    borderRadius: "0",
                    boxShadow: "none",
                    "&:hover": { outline: "none" },
                    padding: "3px",
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
                isSearchable={false}
              />

              <input
                type="text"
                className="border border-[#f2f2f2] px-3 py-2 focus:outline-none w-full"
                placeholder="API Key"
              />
              <input
                type="text"
                className="border border-[#f2f2f2] px-3 py-2 focus:outline-none w-full"
                placeholder="API Secret"
              />
            </div>
          )}
        </div>
        <button type="submit" className="mr-2" onClick={handleAddPortfolio}>
          Add Portfolio
        </button>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default CreatePortfolioModal;
