import Modal from "react-modal";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ExchangeIcon } from "@web3icons/react/dynamic";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreatePortfolio: (payload: { name: string; type: string }) => void;
}

interface NewPortfolio {
  name: string;
  type: "manual" | "exchange";
  exchangeName?: "binance" | "bybit";
  apiKey?: string;
  apiSecret?: string;
}

const portfolioTypeOptions = [
  { value: "manual", label: "manual" },
  { value: "exchange", label: "exchange" },
];

const exchangeOptions = [
  { value: "binance", label: "Binance" },
  { value: "bybit", label: "Bybit" },
];

function CreatePortfolioModal({ isOpen, onClose, onCreatePortfolio }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewPortfolio>({
    defaultValues: {
      name: "",
      type: "manual",
    },
  });
  const portfolioType = watch("type");
  const exchange = watch("exchangeName");

  const onSubmit = (data: NewPortfolio) => {
    onCreatePortfolio(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Portfolio Modal"
      className="absolute top-1/2 left-1/2 bg-white border border-gray-300 p-4 outline-none transform -translate-x-1/2 -translate-y-1/2 w-md"
    >
      <h2 className="text-xl mb-4">add new portfolio</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2">Portfolio Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="border border-[#f2f2f2] px-3 focus:outline-none py-2 w-full"
            placeholder="Enter portfolio name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Portfolio Type</label>

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                {...field}
                options={portfolioTypeOptions}
                isSearchable={false}
                value={portfolioTypeOptions.find(
                  (o) => o.value === field.value
                )}
                onChange={(option) => field.onChange(option?.value)}
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
            )}
          />
        </div>
        {portfolioType === "exchange" && (
          <div className="mb-4 flex flex-col gap-2">
            <label>
              Exchange (READ-ONLY API KEYS)
              { exchange === "binance" && (
                <p className="text-sm text-gray-500">
                  Only Binance SPOT account is supported.
                </p>
              )}
              {exchange === "bybit" && (
                <p className="text-sm text-gray-500">
                  Only Bybit UNIFIED account is supported.
                </p>
              )}
            </label>

            <Controller
              control={control}
              name="exchangeName"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={exchangeOptions}
                  isSearchable={false}
                  value={exchangeOptions.find((o) => o.value === field.value)}
                  onChange={(option) => field.onChange(option?.value)}
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
                  formatOptionLabel={({ value, label }) => {
                    return (
                      <div className="flex items-center gap-2">
                        <ExchangeIcon name={value} size={28} variant="background" />
                        <span>{label}</span>
                      </div>
                    );
                  }}
                />
              )}
            />

            <input
              {...register("apiKey", { required: true, minLength: 8 })}
              className="border border-[#f2f2f2] px-3 py-2 w-full"
              placeholder="API Key"
            />

            <input
              {...register("apiSecret", { required: true, minLength: 8 })}
              className="border border-[#f2f2f2] px-3 py-2 w-full"
              placeholder="API Secret"
            />
            {(errors.apiKey || errors.apiSecret) && (
              <p className="text-red-500 text-sm">
                Both API Key and Secret are required.
              </p>
            )}
          </div>
        )}
        <button
          type="submit"
          className="mr-2 hover:text-gray-400 hover:cursor-pointer"
        >
          Add Portfolio
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="hover:text-red-600 hover:cursor-pointer"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default CreatePortfolioModal;
