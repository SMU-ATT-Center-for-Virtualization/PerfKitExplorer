"""Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Tests for p3rf.perfkit.explorer.pages."""

__author__ = 'joemu@google.com (Joe Allan Muharsky)'

import datetime
import webtest
import unittest

from google.appengine.ext import testbed

from perfkit import test_util
from perfkit.explorer.handlers import base
from perfkit.explorer.handlers import pages


class JsonEncoderTest(unittest.TestCase):
  def testEncodeDatetime(self):
    self.encoder = base._JsonEncoder(sort_keys=True)
    self.dt = datetime.datetime(2008, 9, 15, 12, 30, 00)

    self.assertEqual('"2008-09-15T12:30:00Z"', self.encoder.encode(self.dt))


class PagesTest(unittest.TestCase):
  # TODO: Add more automated validation of parameters and Http Responses.
  # For the time being, manual testing is used to validate this.

  def setUp(self):
    super(PagesTest, self).setUp()
    self.app = webtest.TestApp(pages.app)

    test_util.SetConfigPaths()

    self.testbed = testbed.Testbed()
    self.testbed.activate()
    self.testbed.init_datastore_v3_stub()
    self.testbed.init_memcache_stub()

  def testDefaultPage(self):
    # TODO: Add a token to each page that can be used to better validate
    # behavior.
    resp = self.app.get(url='/', status=301)

    self.assertIsNotNone(resp.html)

  def testExplorePage(self):
    # TODO: Add a token to each page that can be used to better validate
    # behavior.
    resp = self.app.get(url='/explore', status=200)

    self.assertIsNotNone(resp.html)

  def testReviewPage(self):
    # TODO: Add a token to each page that can be used to better validate
    # behavior.
    resp = self.app.get(url='/review', status=301)

    self.assertIsNotNone(resp.html)

  def testAdminPage(self):
    # TODO: Add a token to each page that can be used to better validate
    # behavior.
    resp = self.app.get(url='/dashboard-admin', status=200)

    self.assertIsNotNone(resp.html)


if __name__ == '__main__':
  unittest.main()
