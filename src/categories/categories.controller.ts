import { BadRequestException, Body, ConflictException, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './categories.schema';
import { CategoriesDto } from './categories.dto';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * return all the categories
   * @return {Categories[]} the categories collection
   */
  @Get()
  getCategories(): Promise<Categories[]> {
    return this.categoriesService.getCategories();
  }

  /**
   * return all the filtered categories
   * @param {string} field the field name
   * @param {string} value the value to filter the data
   * @return {Categories[]} the filtered categories
   */
  @Get('/:field/:value')
  getCategoriesByColumn(@Param('field') field: string, @Param('value') value: string): Promise<Categories[]> {
    return this.categoriesService.getCategoriesByField(field, value);
  }

  /**
   * create one categories
   * @param {CategoriesDto} category the category data
   * @return {Categories} the created category
   */
  @Post()
  async createCategories(@Body() category: CategoriesDto): Promise<Categories> {

    /** category name already exist */
    if (await this.categoriesService.categoryAlreadyExist('name', category.name)) {
      throw new ConflictException(`${category.name} already exist`)
    }

    return this.categoriesService.createCategory(category as Categories);
  }

  /**
   * edit one category
   * @param {string} id the category id you want to edit
   * @param {CategoriesDto} updatedCategory the updated category data
   */
  @Put('/:id')
  async editCategory(@Param('id') id: string, @Body() updatedCategory: CategoriesDto): Promise<Categories> {

    /** category doesn't exist */
    const categoryExist = await this.categoriesService.categoryAlreadyExist('_id', id);
    if (!categoryExist) {
      throw new BadRequestException(`${updatedCategory.name} doesn't exist`)
    }

    /** updated category name already exist */
    if (updatedCategory.name) {
      const categoryNameExist = await this.categoriesService.categoryAlreadyExist('name', updatedCategory.name);
      if (categoryNameExist) {
        throw new ConflictException(`${updatedCategory.name} already exist`)
      }
    }

    return this.categoriesService.editCategory(id, updatedCategory);
  }
}
