import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categoryThunks';
import CustomPieChart from './PieChart';

const CategoryChartContainer = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  console.log(categories)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Memoize category data to prevent unnecessary recalculations
  const categoryData = useMemo(() => 
    categories.map((category) => ({
      name: category.name,
      value: category._count.books || 0,
    })),
    [categories]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <CustomPieChart data={categoryData} />;
};

export default CategoryChartContainer;
