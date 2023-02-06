/* eslint-disable prettier/prettier */
import MainLayout from '../../../layouts/MainLayout';
import LeftArrow from '../../../public/images/LeftArrow.svg';
import UpArrow from '../../../public/images/UpArrow.svg';
import styles from '../../../styles/ShopProductDetail.module.scss';
import ProductCover from '../../../public/images/productcover.png';
import Image from 'next/image';
import Input from '../../Input';
import Button from '../../Button';
import useModal from '../../../hooks/useModal';
import Modal from '../../../modals/Modal';
/* eslint-disable prettier/prettier */
const Checkout = () => {
  const { show, toggleShow } = useModal(false);
  return (
    <>
      <Modal show={show} toggleShow={toggleShow} />

      <MainLayout activeLink="/shop">
        <div className="md:px-6 xs:px-1">
          <div className="flex flex-row items-center ">
            <Image src={LeftArrow} alt={'arrow'} className="mr-2" />
            <div className={styles.title}>back </div>
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1  md:gap-0  sm:gap-7 md:pt-12 xs:pt-7">
            <div className="">
              <div className="">
                <h1 className="font-sans text-2xl">Contact Info</h1>
                <div className="md:mt-7 xs:pt-4">
                  <Input
                    placeholder="Enter your email address"
                    id="address-line-1"
                    label="Email Address"
                    className="lg:h-10 xs:h-8 border !border-slate-600 outline-none placeholder:text-sm placeholder:text-slate-600 !text-sm !w-full"
                    labelclassName="font-sans md:text-xl xs:text-sm"
                  />
                </div>
              </div>
              <div className=" md:pt-12 xs:pt-7">
                <h1 className="font-sans text-2xl">Shipping Address</h1>
                <div className="md:mt-7 xs:pt-4">
                  <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-5 ">
                    <div>
                      <Input
                        id="name"
                        label="Full Name"
                        placeholder="Enter your full name"
                        className="lg:h-10 !sm:h-8 border !border-slate-600 outline-none !py-2 placeholder:text-sm placeholder:text-slate-600 !text-sm !md:w-7/12 sm:w-full"
                        labelclassName="font-sans md:text-xl xs:text-sm"
                      />
                    </div>
                    <div>
                      <Input
                        id="phone"
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        className="lg:h-10 sm:h-8 border border-slate-600 outline-none !py-2 placeholder:text-sm placeholder:text-slate-600 !text-sm !md:w-7/12 sm:w-full"
                        labelclassName="font-sans md:text-xl sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:mt-4 xs:pt-4">
                  <Input
                    id="address"
                    label="Address"
                    placeholder="Enter your Address"
                    className="lg:h-10 !sm:h-8 border !border-slate-600 outline-none !py-2 placeholder:text-sm placeholder:text-slate-600 !text-sm md:w-full sm:w-full"
                    labelclassName="font-sans md:text-xl xs:text-sm"
                  />
                </div>
                <div className="md:mt-7 xs:pt-4">
                  <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-5 ">
                    <div>
                      <Input
                        id="apartment"
                        label="Apt / Unit"
                        placeholder="Enter your apartment number"
                        className="lg:h-10 !sm:h-8 border !border-slate-600 outline-none !py-2 placeholder:text-sm placeholder:text-slate-600 !text-sm !md:w-7/12 sm:w-full"
                        labelclassName="font-sans md:text-xl xs:text-sm"
                      />
                    </div>
                    <div>
                      <Input
                        id="zip"
                        label="Zip code"
                        placeholder="Enter your zip code"
                        className="lg:h-10 sm:h-8 border border-slate-600 outline-none !py-2 placeholder:text-sm placeholder:text-slate-600 !text-sm !md:w-7/12 sm:w-full"
                        labelclassName="font-sans md:text-xl sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:mt-7 xs:pt-4">
                  <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-5 ">
                    <div>
                      <Input
                        id="city"
                        label="City"
                        placeholder="Enter your City"
                        className="lg:h-10 !sm:h-8 border !border-slate-600 outline-none !py-2 placeholder:text-sm placeholder:text-slate-600 !text-sm !md:w-7/12 sm:w-full"
                        labelclassName="font-sans md:text-xl xs:text-sm"
                      />
                    </div>
                    <div>
                      <Input
                        id="state"
                        label="State"
                        placeholder="Enter your state"
                        className="lg:h-10 sm:h-8 border border-slate-600 outline-none !py-2 placeholder:text-sm placeholder:text-slate-600 !text-sm !md:w-7/12 sm:w-full"
                        labelclassName="font-sans md:text-xl sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" md:px-10 xs:px-0 xs:mt-10 md:pt-0">
              <div className="flex flex-row gap-4">
                <Image
                  src={ProductCover}
                  alt={'product'}
                  className="w-32 h-36 object-cover"
                />
                <div className="flex flex-col justify-between">
                  <h4 className="text-lg tracking-wider md:w-4/6 xs:w-11/12 items-start">
                    X-LOGICAL T-shirt X-LOGICAL T-shirt
                  </h4>
                  <p className="items-end mb-2">Qty : 1</p>
                </div>
              </div>
              <div className="bg-slate-50 md:w-3/5 md:mt-10 xs:pt-4 xs:mt-10 rounded-lg px-3 xs:w-full">
                <div className="flex flex-row justify-between ">
                  <h4 className="text-xl font-sans">Total</h4>
                  <div className=" text-2xl font-bold flex flex-row items-center">
                    <Image
                      src="/vectors/icons/h.svg"
                      width={20}
                      height={22}
                      alt="h"
                      className="mr-1"
                    />
                    1200
                  </div>
                </div>
                <hr className="w-11/12 mx-auto my-3"></hr>
                <div className="flex flex-row justify-between ">
                  <p className="text-md font-sans text-slate-700">Items</p>
                  <div className=" text-md  text-slate-700">1</div>
                </div>
                <Button
                  className="mt-16 w-full"
                  variant="primary"
                  onClick={() => toggleShow()}>
                  Redeem
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Checkout;
