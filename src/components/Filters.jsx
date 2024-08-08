"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownSection,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Switch,
  Slider,
  Chip,
  cn,
} from "@nextui-org/react";

//CONSTANT
import { bedCount, saleLease, houseType, washroomCount } from "@/constant";
import useDeviceView from "@/helpers/useDeviceView";

const bgColor = {
  saleLease: "bg-primary-green",
  priceDecreased: "bg-primary-green",
  time: "bg-primary-green",
  type: "bg-primary-green",
  minTimestampSql: "bg-[#eb7e6c]/1",
  bed: "bg-primary-green",
};

const textColor = {
  saleLease: "text-white",
  areas: "text-white",
  time: "text-black",
  type: "text-white",
  minTimestampSql: "text-black",
  bed: "text-white",
};

const Filters = ({ filterState, setFilterState, fetchFilteredData }) => {
  const [navbar, setNavbar] = useState(false);

  const { isMobileView } = useDeviceView();

  //options for lease or sale
  const saleLeaseOptions = Object.values(saleLease).map((item) => item.name);
  //options for bed count
  const bedCountOptions = Object.values(bedCount).map((item) => item.name);
  //options for house type
  const houseTypeOptions = Object.values(houseType).map((item) => item.name);
  //options for washroom counts
  const washroomCountOptions = Object.values(washroomCount).map(
    (item) => item.name
  );

  //dynamic price range generator based on sale or lease options
  const minMaxPrice = useMemo(() => {
    if (filterState.saleLease.includes(Object.values(saleLease)[1].name)) {
      //i.e for lease, display different min and max value
      return {
        min: 1500,
        max: 8000,
      };
    } else {
      return {
        min: 400000,
        max: 3000000,
      };
    }
  }, [filterState]);

  const handleFilterChange = (name, value) => {
    const newFilterState = { ...filterState };
    newFilterState[name] = value;
    if (name === "saleLease") {
      //reset the price filter
      newFilterState["priceRange"] = {
        min: 0,
        max: 0,
      };
    }
    setFilterState({ ...newFilterState });

    fetchFilteredData(newFilterState);
  };

  const additonalFilterChange = (filteredValue) => {
    const newFilterState = { ...filterState, ...filteredValue };

    setFilterState({ ...newFilterState });

    fetchFilteredData(newFilterState);
  };

  useEffect(() => {
    const rect = document.body.getBoundingClientRect();
    if (window) {
      window.addEventListener("scroll", () => {
        setNavbar(false);
      });

      document.addEventListener("DOMContentLoaded", function () {
        // Code to ensure that the Slider component receives focus when clicked directly
        document
          .querySelector(".price-range__slider")
          .addEventListener("click", function (event) {
            const slider = event.target.closest(".max-w-md.slider");
            if (slider) {
              slider.focus();
            }
          });
      });
    }
  }, []);

  return (
    <>
      <div
        className={`filters flex gap-2 gap-md-3 my-2 flex flex-wrap bg-white overflow-visible${
          navbar
            ? `filter__scrolled mt-4 pb-2 container-fluid`
            : `top-[0px] items-center`
        }`}
      >
        <IndividualFilterButton
          options={saleLeaseOptions}
          name="saleLease"
          value={filterState.saleLease}
          handleFilterChange={handleFilterChange}
        />

        <div className="bed__filter mr-4 ">
          <IndividualFilter
            options={bedCountOptions}
            defaultValue={bedCountOptions[0]}
            name="bed"
            value={filterState.bed}
            setFilterState={setFilterState}
            handleFilterChange={handleFilterChange}
            isMobileView={isMobileView}
          />
        </div>

        <div className="house-type__filter mr-4 ">
          <IndividualFilter
            options={houseTypeOptions}
            defaultValue={houseTypeOptions[0]}
            name="type"
            value={filterState.type}
            setFilterState={setFilterState}
            handleFilterChange={handleFilterChange}
            // isMulti={true}
            isMulti={false}
            isMobileView={isMobileView}
          />
        </div>

        {/* {isMobileView ? (
          <div className="basement__filter">
            <IndividualFilterWithCancel
              name="hasBasement"
              {...{ handleFilterChange }}
              value={filterState.hasBasement}
            />
          </div>
        ) : null} */}
        <div className="more__filter">
          <MoreFilter
            {...{ washroomCountOptions, additonalFilterChange, filterState }}
          />
        </div>

        <IndividualFilterNoOptions
          label="Price Decreased"
          name="priceDecreased"
          value={filterState.priceDecreased}
          handleFilterChange={handleFilterChange}
        />
        {!isMobileView ? (
          <div className="price-range__filter ml-2 h-[34px] pb-14 px-10 w-[25vw]">
            <div
              className={
                filterState.saleLease == "For Sale" ? "block" : "hidden"
              }
            >
              <PriceRangeFilter
                name="priceRange"
                value={filterState.priceRange}
                handleFilterChange={handleFilterChange}
                minMaxPrice={{
                  min: 40000,
                  max: 10000000,
                }}
              />
            </div>

            <div
              className={
                filterState.saleLease == "For Lease" ? "block" : "hidden"
              }
            >
              <PriceRangeFilter
                name="priceRange"
                value={filterState.priceRange}
                handleFilterChange={handleFilterChange}
                minMaxPrice={{ min: 1500, max: 8000 }}
              />
            </div>
          </div>
        ) : null}
      </div>

      {isMobileView ? (
        <div className="container-fluid price-filter__bottom">
          <PriceRangeFilterBottom
            name="priceRange"
            value={filterState.priceRange}
            setFilterState={setFilterState}
            handleFilterChange={handleFilterChange}
            minMaxPrice={minMaxPrice}
          />
        </div>
      ) : null}
    </>
  );
};

const IndividualFilter = ({
  options,
  name,
  value,
  handleFilterChange,
  isMobileView,
  isMulti = false,
  defaultValue,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(() =>
    isMulti ? [...value] : [value]
  );

  const handleKeyChange = (newKey) => {
    setSelectedKeys(newKey);
    handleFilterChange(name, getSelectedValue(newKey));
  };

  const getSelectedValue = useCallback(
    (key) => Array.from(key).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <Dropdown>
      <DropdownTrigger disableAnimation={true}>
        <Button
          variant="faded"
          className={`capitalize h-[34px] bg-color roundedPill border-medium-black ${
            isMobileView && "px-2 gap-1 min-w-unit-0"
          } ${
            getSelectedValue(selectedKeys) !== defaultValue &&
            `${bgColor[name]} ${textColor[name]} border-primary-green`
          }`}
        >
          {getSelectedValue(selectedKeys)}
          <i className="bi bi-chevron-down" style={{ fontSize: "0.7rem" }}></i>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={name}
        disallowEmptySelection
        selectionMode={isMulti ? "multiple" : "single"}
        selectedKeys={selectedKeys}
        onSelectionChange={handleKeyChange}
      >
        {options.map((option) => {
          return <DropdownItem key={option}>{option}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

const PriceRangeFilter = ({ name, value, handleFilterChange, minMaxPrice }) => {
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });

  const handlePriceChange = (inputName, value) => {
    const newPrice = {
      ...price,
      [inputName]: Number(value),
    };

    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  const valueToDisplay = useMemo(() => {
    if (price.min && !price.max) {
      return `Over $${price.min}`;
    } else if (price.min && price.max) {
      return `$${price.min} - $${price.max}`;
    } else {
      return "Price";
    }
  }, [price]);

  const handleRangeChange = ([min, max]) => {
    const newPrice = { min, max };
    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  useEffect(() => {
    const newPrice = {
      min: value?.min ?? 0,
      max: value?.max ?? 0,
    };
    setPrice(newPrice);
  }, [value]);

  return (
    <div className="price-range__slider">
      <Slider
        label="Price Range"
        step={50}
        minValue={minMaxPrice.min}
        maxValue={minMaxPrice.max}
        onChangeEnd={handleRangeChange}
        defaultValue={[minMaxPrice.min, minMaxPrice.max]}
        formatOptions={{
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }}
        classNames={{
          filler: "bg-primary-green",
        }}
        renderThumb={(props) => (
          <div
            {...props}
            className="bg-primary-green group p-1 top-1/2 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
          >
            <span className="transition-transform shadow-small rounded-full w-3 h-3 block group-data-[dragging=true]:scale-80"></span>
          </div>
        )}
      />
      {(props) => {
        return (
          <div
            {...props}
            className="p-1 top-50 bg-primary-green border border-secondary rounded-circle shadow cursor-grab"
          >
            <span className="bg-primary-green shadow rounded-circle w-5 h-5 d-block" />
          </div>
        );
      }}
    </div>
    // <Dropdown>
    //   <DropdownTrigger disableAnimation={true}>
    //     <Button
    //       variant="faded"
    //       className="capitalize bg-color roundedPill h-[34px] border-2"
    //       size="md"
    //     >
    //       {valueToDisplay}
    //       <i className="bi bi-chevron-down"></i>
    //     </Button>
    //   </DropdownTrigger>
    //   <DropdownMenu
    //     aria-label="price filter"
    //     itemClasses={{
    //       base: ["data-[hover=true]:bg-default-0"],
    //     }}
    //   >
    //     <DropdownSection aria-label="price filter" showDivider>
    //       <DropdownItem key="price" isReadOnly>
    //         <p className="font-bold mb-2">
    //           Filter price based on min and max price
    //         </p>
    // <div className="flex gap-3">
    //   <Input
    //     type="number"
    //     label="Min Price"
    //     className="w-40"
    //     size="sm"
    //     variant="underlined"
    //     value={value?.min}
    //     min={0}
    //     onFocus={(event) => event.target.select()}
    //     onValueChange={(value) => handlePriceChange("min", value)}
    //     startContent={
    //       <div className="pointer-events-none flex items-center">
    //         <span className="text-default-400 text-small">$</span>
    //       </div>
    //     }
    //   />
    //   <Input
    //     type="number"
    //     label="Max Price"
    //     className="w-40"
    //     size="sm"
    //     disabled={price.min <= 0}
    //     variant="underlined"
    //     value={value?.max}
    //     min={value?.min}
    //     onFocus={(event) => event.target.select()}
    //     onValueChange={(value) => handlePriceChange("max", value)}
    //     startContent={
    //       <div className="pointer-events-none flex items-center">
    //         <span className="text-default-400 text-small">$</span>
    //       </div>
    //     }
    //   />
    // </div>
    // <p className="font-bold mt-4 mb-4">Select min or max price range </p>
    // <div className="price-range__slider">
    //   <Slider
    //     label="Price Range"
    //     step={50}
    //     minValue={minMaxPrice.min}
    //     maxValue={minMaxPrice.max}
    //     onChangeEnd={handleRangeChange}
    //     defaultValue={[minMaxPrice.min, minMaxPrice.max]}
    //     formatOptions={{ style: "currency", currency: "USD" }}
    //     classNames={{
    //       filler: "bg-primary-green",
    //     }}
    //     renderThumb={(props) => (
    //       <div
    //         {...props}
    //         className="bg-primary-green group p-1 top-1/2 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
    //       >
    //         <span className="transition-transform shadow-small rounded-full w-3 h-3 block group-data-[dragging=true]:scale-80"></span>
    //       </div>
    //     )}
    //   />
    //   {(props) => {
    //     return (
    //       <div
    //         {...props}
    //         className="p-1 top-50 bg-light border border-secondary rounded-circle shadow cursor-grab"
    //       >
    //         <span className="bg-primary-green shadow rounded-circle w-5 h-5 d-block" />
    //       </div>
    //     );
    //   }}
    // </div>
    //       </DropdownItem>
    //     </DropdownSection>
    //     {/* {options.map((option) => {
    //       return <DropdownItem key={option}>{option}</DropdownItem>
    //     })} */}
    //   </DropdownMenu>
    // </Dropdown>
  );
};

const MoreFilter = ({
  washroomCountOptions,
  additonalFilterChange,
  filterState,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [moreFilterState, setMoreFilterState] = useState({
    hasBasement: filterState.hasBasement,
    sepEntrance: filterState.sepEntrance,
    washroom: filterState.washroom,
  });

  const _handleFilterChange = (name, value) => {
    const newFilterState = {
      ...moreFilterState,
      [name]: value,
    };
    setMoreFilterState(newFilterState);
  };

  const handleClick = (key) => {
    const foundWashroom = Object.values(washroomCount).find(
      (washroom) => washroom.name === key
    );
    _handleFilterChange("washroom", foundWashroom.value);
  };

  const isActiveWashroom = useCallback(
    (key) => {
      const foundWashroom = Object.values(washroomCount).find(
        (washroom) => washroom.name === key
      );
      return foundWashroom.value === moreFilterState.washroom;
    },
    [moreFilterState]
  );

  return (
    <div className="mr-4">
      <Button
        onPress={onOpen}
        variant="faded"
        className="capitalize h-[34px] bg-color roundedPill border-black"
        size="md"
      >
        More Filter
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        className={{
          footer: "z-999",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
              <ModalBody>
                <div className="basement__bool">
                  <p className="fs-5 fw-500 mb-2">Basement</p>
                  <div className="flex gap-5">
                    <Switch
                      isSelected={moreFilterState.hasBasement}
                      onValueChange={(value) =>
                        _handleFilterChange("hasBasement", value)
                      }
                      classNames={{
                        wrapper: cn(
                          "group-data-[selected=true]:bg-primary-green"
                        ),
                      }}
                    >
                      Finished Basement
                    </Switch>

                    <Switch
                      isSelected={moreFilterState.sepEntrance}
                      onValueChange={(value) =>
                        _handleFilterChange("sepEntrance", value)
                      }
                      classNames={{
                        wrapper: cn(
                          "group-data-[selected=true]:bg-primary-green"
                        ),
                      }}
                    >
                      Separate Entrance
                    </Switch>
                  </div>
                </div>

                <div className="washroom__count mt-3">
                  <p className="fs-5 fs-sm-4 fw-500 mb-2">Washrooms</p>
                  <div className="flex gap-3 flex-wrap">
                    {washroomCountOptions.map((washroom, index) => {
                      return (
                        <div
                          key={index}
                          className={`border border-secondary-subtle rounded-full px-3 py-1 cursor-pointer ${
                            isActiveWashroom(washroom) ? "active-pills" : ""
                          }`}
                          onClick={() => handleClick(washroom)}
                        >
                          {washroom}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="w-100 flex">
                <Button
                  color="secondary"
                  variant="faded"
                  onPress={onClose}
                  className="w-50 dynamic"
                >
                  Close
                </Button>
                <Button
                  onPress={() => {
                    additonalFilterChange(moreFilterState);
                    onClose();
                  }}
                  className="w-50 dynamic bg-primary-green text-white"
                >
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

const PriceRangeFilterBottom = ({
  name,
  value,
  handleFilterChange,
  minMaxPrice,
}) => {
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });

  const [defaultPrice, setDefaultPrice] = useState({
    min: minMaxPrice.min,
    max: minMaxPrice.max,
  });

  const [unMount, setUnMount] = useState(false);

  const convertIntoCurrency = useCallback(
    (price) => {
      return Number(price).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    },
    [price]
  );

  const handleRangeChange = ([min, max]) => {
    const newPrice = { min, max };
    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  useEffect(() => {
    const newPrice = {
      min: value?.min > 0 ? value?.min : minMaxPrice.min,
      max: value?.max > 0 ? value?.max : minMaxPrice.max,
    };

    const newDefaultPrice = {
      min: minMaxPrice.min,
      max: minMaxPrice.max,
    };
    setDefaultPrice(newDefaultPrice);
    setPrice(newPrice);

    if (value.min === 0 && value.max === 0) {
      setUnMount(true);
      setTimeout(() => {
        setUnMount(false);
      }, [10]);
    }
  }, [value, minMaxPrice]);

  return (
    <>
      <div className="price-range__slider">
        {!unMount && (
          <Slider
            step={50}
            label=""
            color="foreground"
            minValue={defaultPrice.min}
            maxValue={defaultPrice.max}
            showTooltip={true}
            // value={[price.min, price.max]}
            onChangeEnd={handleRangeChange}
            defaultValue={[defaultPrice.min, defaultPrice.max]}
            formatOptions={{ style: "currency", currency: "USD" }}
            classNames={{
              base: "max-w-md slider gap-3",
              track: "bg-light border border-secondary",
              filler: "bg-primary-green bg-gradient-to-r",
              value: "font-bold fs-6",
            }}
            renderThumb={(props) => {
              return (
                <div
                  {...props}
                  className="p-1 top-50 bg-light border border-secondary rounded-circle shadow cursor-grab"
                >
                  <span className="bg-primary-green shadow rounded-circle w-5 h-5 d-block" />
                  {!props["data-pressed"] && (
                    <>
                      {props.index === 0 ? (
                        <span
                          style={{
                            position: "absolute",
                            top: -32,
                            left: -10,
                            fontSize: "11px",
                          }}
                          className="custom-range-thumb p-1 border-md"
                        >
                          {convertIntoCurrency(price.min)}
                        </span>
                      ) : null}
                      {props.index === 1 ? (
                        <span
                          style={{
                            position: "absolute",
                            top: -32,
                            left: -30,
                            fontSize: "11px",
                          }}
                          className="custom-range-thumb p-1 border-md"
                        >
                          {convertIntoCurrency(price.max)}
                        </span>
                      ) : null}
                    </>
                  )}
                </div>
              );
            }}
            tooltipProps={{
              offset: 10,
              placement: "bottom",
              classNames: {
                base: [
                  // arrow color
                  "custom-range-thumb",
                ],
                content: [
                  "py-2 shadow-xl",
                  "text-dark custom-range-thumb rounded-circle",
                ],
              },
            }}
          />
        )}
      </div>
    </>
  );
};

const IndividualFilterButton = ({
  options,
  name,
  value,
  handleFilterChange,
}) => {
  const [activeFilter, setActiveFilter] = useState(value);

  const isActive = (key) => {
    const foundSalesLease = options.find((option) => option === key);
    return foundSalesLease === activeFilter;
  };

  const handleClick = (name, option) => {
    setActiveFilter(option);
    handleFilterChange(name, option);
  };

  return (
    <div className="inline-flex sm:mr-4 flex-wrap gap-y-2">
      {options.map((option, index) => {
        return (
          <div
            key={index}
            className={`mx-[2px] px-3 py-1 h-[34px] cursor-pointer text-nowrap text-small h-[34px] flex justify-content-center align-items-center rounded-full border-2
            ${
              isActive(option)
                ? `border-primary-green text-white ${bgColor[name]}`
                : "border-medium-black"
            }`}
            onClick={() => handleClick(name, option)}
            style={{ border: "2px solid #e5e7eb" }}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};

const IndividualFilterNoOptions = ({
  label,
  name,
  value,
  handleFilterChange,
}) => {
  const [isActive, setActive] = useState(value);

  const handleClick = (name, value) => {
    setActive(value);
    handleFilterChange(name, value);
  };

  return (
    <div
      className={`px-3 py-1 h-[34px] cursor-pointer text-nowrap text-small h-[34px] flex justify-content-center align-items-center rounded-full border-2 ${
        isActive
          ? "bg-primary-green text-white border-primary-green"
          : "border-medium-black"
      }`}
      onClick={() => handleClick(name, !value)}
      style={{ border: "2px solid #e5e7eb" }}
    >
      {label}
    </div>
  );
};

const IndividualFilterWithCancel = ({ name, value, handleFilterChange }) => {
  return (
    <Chip
      className="h-[34px] roundedPill"
      onClose={value ? () => handleFilterChange(name, false) : undefined}
      radius="md"
      variant={value ? "solid" : "bordered"}
      onClick={() => handleFilterChange(name, !value)}
      classNames={{
        base: value ? "bg-primary-green" : "default",
        content: value ? "text-white" : "text-dark",
        closeButton: value ? "text-white" : "text-dark",
      }}
    >
      Finished Basement
    </Chip>
  );
};
export default Filters;
