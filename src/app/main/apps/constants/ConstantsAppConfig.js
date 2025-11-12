import { lazy } from 'react';

import ContractType from './contractTypes/contractType/contractType';
import LeadSource from './leadSources/leadSource/leadSource';
import ShippingProvider from './shippingProviders/shippingProvider/shippingProvider';
import TaskStage from './taskStages/taskStage/taskStage';
import Type from './accounts/types/type/type';
import TypeDoc from './documents/types/type/typeDoc';
import Industrie from './accounts/industries/industrie/industrie';
import Folder from './documents/folders/folder/folder';
import Categorie from './products/categories/categorie/categorie';
import Brand from './products/brands/brand/brand';
import Tax from './products/taxs/tax/tax';

const ContractTypes = lazy(() => import('./contractTypes/contractTypes/ContractTypes'));
const LeadSources = lazy(() => import('./leadSources/leadSources/LeadSources'));
const ShippingProviders = lazy(() =>
  import('./shippingProviders/shippingProviders/ShippingProviders')
);
const TaskStages = lazy(() => import('./taskStages/taskStages/TaskStages'));
const TypesDoc = lazy(() => import('./documents/types/types/TypesDoc'));
const Types = lazy(() => import('./accounts/types/types/Types'));
const Industries = lazy(() => import('./accounts/industries/industries/Industries'));
const Folders = lazy(() => import('./documents/folders/folders/Folders'));
const Categories = lazy(() => import('./products/categories/categories/Categories'));
const Brands = lazy(() => import('./products/brands/brands/Brands'));
const Taxs = lazy(() => import('./products/taxs/taxs/Taxs'));

const ConstantsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/constants/contractTypes',
      element: <ContractTypes />,
    },
    {
      path: 'apps/constants/contractTypes/:contractTypeId/*',
      element: <ContractType />,
    },
    {
      path: 'apps/constants/leadSources',
      element: <LeadSources />,
    },
    {
      path: 'apps/constants/leadSources/:leadSourceId/*',
      element: <LeadSource />,
    },
    {
      path: 'apps/constants/shippingProviders',
      element: <ShippingProviders />,
    },
    {
      path: 'apps/constants/shippingProviders/:shippingProviderId/*',
      element: <ShippingProvider />,
    },
    {
      path: 'apps/constants/taskStages',
      element: <TaskStages />,
    },
    {
      path: 'apps/constants/taskStages/:taskStageId/*',
      element: <TaskStage />,
    },
    {
      path: 'apps/constants/accounts/types',
      element: <Types />,
    },
    {
      path: 'apps/constants/accounts/types/:typeId/*',
      element: <Type />,
    },
    {
      path: 'apps/constants/accounts/types',
      element: <Types />,
    },
    {
      path: 'apps/constants/accounts/types/:typeId/*',
      element: <Type />,
    },
    {
      path: 'apps/constants/accounts/industries',
      element: <Industries />,
    },
    {
      path: 'apps/constants/accounts/industries/:industrieId/*',
      element: <Industrie />,
    },
    {
      path: 'apps/constants/documents/types',
      element: <TypesDoc />,
    },
    {
      path: 'apps/constants/documents/types/:typeId/*',
      element: <TypeDoc />,
    },
    {
      path: 'apps/constants/documents/folders',
      element: <Folders />,
    },
    {
      path: 'apps/constants/documents/folders/:folderId/*',
      element: <Folder />,
    },
    {
      path: 'apps/constants/products/categories',
      element: <Categories />,
    },
    {
      path: 'apps/constants/products/categories/:categorieId/*',
      element: <Categorie />,
    },
    {
      path: 'apps/constants/products/brands',
      element: <Brands />,
    },
    {
      path: 'apps/constants/products/brands/:brandId/*',
      element: <Brand />,
    },
    {
      path: 'apps/constants/products/taxs',
      element: <Taxs />,
    },
    {
      path: 'apps/constants/products/taxs/:taxId/*',
      element: <Tax />,
    },
  ],
};

export default ConstantsAppConfig;
