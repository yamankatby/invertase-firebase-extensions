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
import { Operation, OperationBuilder } from '../types';

/**
 * The user visible name of this operation.
 */
const name = 'output';

/**
 * Output to png.
 */
const structPng = superstruct.object({
  operation: superstruct.literal(name),
  format: superstruct.literal('png'),
  // TODO options
});

/**
 * Output to jpeg.
 */
const structJpeg = superstruct.object({
  operation: superstruct.literal(name),
  format: superstruct.literal('jpeg'),
  // TODO options
});

/**
 * Output to webp.
 */
const structWebp = superstruct.object({
  operation: superstruct.literal(name),
  format: superstruct.literal('webp'),
  // TODO options
});

/**
 * Output to tiff.
 */
const structTiff = superstruct.object({
  operation: superstruct.literal(name),
  format: superstruct.literal('tiff'),
  // TODO options
});

/**
 * Output to avif.
 */
const structAvif = superstruct.object({
  operation: superstruct.literal(name),
  format: superstruct.literal('avif'),
  // TODO options
});

/**
 * An operation that defines image output format and options.
 */
const struct = superstruct.union([
  structPng,
  structJpeg,
  structWebp,
  structTiff,
  structAvif,
]);

export type OperationOutput = superstruct.Infer<typeof struct>;

export const operationOutput: OperationBuilder = {
  name,
  struct,
  validate(rawOptions: Operation): Operation {
    switch (rawOptions.format) {
      case 'jpeg':
        return structJpeg.create(rawOptions);
      case 'webp':
        return structWebp.create(rawOptions);
      case 'tiff':
        return structTiff.create(rawOptions);
      case 'avif':
        return structAvif.create(rawOptions);
      case 'png':
      default:
        return structPng.create({ ...rawOptions, format: 'png' });
    }
  },
  async build(operation) {
    const options = operation.options as OperationOutput;

    return [
      {
        method: options.format,
        arguments: [utils.omitKey(options, 'format')],
      },
    ];
  },
};
