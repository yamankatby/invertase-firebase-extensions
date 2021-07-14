/*
 * Copyright (c) 2016-present Invertase Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as superstruct from 'superstruct';
import * as utils from '../utils';
import { OperationBuilder } from '../types';

/**
 * The user visible name of this operation.
 */
const name = 'extract';

/**
 * Extract/crop a region of the image.
 */
const struct = superstruct.object({
  operation: superstruct.literal(name),

  /**
   * Zero-indexed offset in pixels from the top edge.
   *
   * Defaults to 0.
   */
  top: superstruct.defaulted(
    utils.coerceStringToInt(superstruct.min(superstruct.integer(), 0)),
    0,
  ),

  /**
   * Zero-indexed offset in pixels from the left edge.
   *
   * Defaults to 0.
   */
  left: superstruct.defaulted(
    utils.coerceStringToInt(superstruct.min(superstruct.integer(), 0)),
    0,
  ),

  /**
   * Width of the region to extract in pixels.
   */
  width: utils.coerceStringToInt(superstruct.min(superstruct.integer(), 0)),

  /**
   * Height of the region to extract in pixels.
   */
  height: utils.coerceStringToInt(superstruct.min(superstruct.integer(), 0)),
});

export type OperationExtract = superstruct.Infer<typeof struct>;

export const operationExtract: OperationBuilder = {
  name,
  struct,
};
